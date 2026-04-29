import { test, expect } from '@playwright/test';

test('newWindow Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const documents = page.locator("a[href*='documents']");

    // Navigate to URL and verify the title
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(documents).toHaveAttribute('class', 'blinkingText');

     /* There are two common ways to capture a new tab opened with target="_blank":
         1) Use Promise.all to wait for the 'page' event while performing the click
             (recommended in tutorials). Example:
                 const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    documents.click()
                 ]);

         2) Use a pagePromise (waitForEvent) to get the new page after the click,
             as shown in the Playwright docs. Example:
                 const pagePromise = context.waitForEvent('page');
                 await documents.click();
                 const newPage = await pagePromise;
     */

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documents.click()
    ])

    // Navigate to the new page and validate the title, extract domain name.
    await expect(newPage).toHaveTitle('RS Academy');
    const text = await newPage.locator('.red').textContent();
    const domainName = text.split('@')[1].split(".")[0];

    // Navigate back to the original page and perform login using the extracted domain name
    await username.fill(domainName);
    await password.fill('Learning@830$3mK2');

    // Click sigin and validate the title of the page after login
    await signIn.click();
    await page.waitForLoadState();
    await expect(page).toHaveTitle('ProtoCommerce');
})

test('multipleNewWindows', async ({ browser }) => {

    /* this test is used to capture 2 new tabs that were 
    opened while click of a button in a webpage */

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.hyrtutorials.com/p/window-handles-practice.html");
    await page.waitForLoadState();
    console.log(await page.title());

    const newPages = []; // store new pages i.e., tabs here

    // Start listening for new pages
    const listener = page => newPages.push(page);
    context.on('page', listener);

    // Trigger the action that opens two tabs
    await page.locator('#newTabsBtn').click();

    /* Wait until both pages are opened
    initally gave 1000 ms but page is taking time to load.
    so chnaged to 3000ms */
    await page.waitForTimeout(3000);

    // Stop listening to avoid memory leak
    context.off('page', listener);

    const [newPage1, newPage2] = newPages;

    // Example: interact with them
    console.log(await newPage1.title());
    console.log(await newPage2.title());

})