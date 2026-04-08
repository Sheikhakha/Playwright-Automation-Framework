import {test,expect} from '@playwright/test';

test('Valid credentials', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click(); 

    await expect(page).toHaveTitle('ProtoCommerce');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    console.log(await page.title());
    console.log(await page.locator('.card-body a').allTextContents());
    await expect(page.locator('.card-body a').first()).toHaveText('iphone X');
})


test('Invalid credentials test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click(); 
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

})


