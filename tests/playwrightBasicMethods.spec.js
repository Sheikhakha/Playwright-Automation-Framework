import {test,expect} from '@playwright/test';

test('Valid credentials', async ({browser}) => {
    // Create a fresh browser context and page for this test
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page and verify the title
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    // Login with valid credentials
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click(); 

    // Validate the successfull navigation
    await expect(page).toHaveTitle('ProtoCommerce');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    console.log(await page.title());

    // Validate the product is visible and has the text 'iphone X'
    console.log(await page.locator('.card-body a').allTextContents());
    await expect(page.locator('.card-body a').first()).toHaveText('iphone X');
})


test('Invalid credentials test', async ({page}) => {

    // Navigate to the login page and verify the title
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    // fill in with invalid credentials and click login
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click(); 

    // Validate the error message is visible and contains 'Incorrect'
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

})


