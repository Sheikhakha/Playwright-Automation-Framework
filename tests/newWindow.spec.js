import {test,expect} from '@playwright/test';

test('newWindow Test', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const userRadioButton = page.locator('.checkmark').nth(1);
    const okay = page.locator('#okayBtn');
    const select = page.locator('select.form-control');
    const terms = page.locator('#terms');
    const signIn = page.locator('#signInBtn');
    const documents = page.locator("a[href*='documents']");



    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(documents).toHaveAttribute('class','blinkingText');

    /* either use promise.all to find the new tab or use the pagePromise 
    to get access of the new tab that was opened when target = '_blanks' 
    pagePromise = waitforevent code was given in the official documentation of
    playwright.
    While promise.all was given in rahul shetty udemy course */

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documents.click()
    ])

    // const pagePromise = context.waitForEvent('page');
    // await documents.click();
    // const newPage = await pagePromise;

    await expect(newPage).toHaveTitle('RS Academy');
    const text = await newPage.locator('.red').textContent();
    const domainName = text.split('@')[1].split(".")[0];
    await username.fill(domainName);
    await password.fill('Learning@830$3mK2');
    await userRadioButton.click();
    await okay.click();
    await expect(userRadioButton).toBeChecked();
    await select.selectOption('teach');
    await expect(select).toHaveValue('teach');
    await terms.check();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await signIn.click();
    await page.waitForLoadState();
    await expect(page).toHaveTitle('ProtoCommerce');
})

test('multipleNewWindows',async ({browser}) => {

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
    initally gave 1000 ms but page is taking tiem to load.
    so chnaged to 3000ms */
    await page.waitForTimeout(3000);

    // Stop listening to avoid memory leak
    context.off('page', listener);

    const [newPage1, newPage2] = newPages;

    // Example: interact with them
    console.log(await newPage1.title());
    console.log(await newPage2.title());

})