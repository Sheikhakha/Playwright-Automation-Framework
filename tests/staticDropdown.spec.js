import {test,expect} from '@playwright/test';


test('staticDropdown', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const user = page.locator('.checkmark').nth(1);
    const selectDropdown = page.locator('select.form-control');
    const signIn = page.locator('#signInBtn');
    const terms = page.locator('#terms');


    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await user.click();
    await page.locator('#okayBtn').click();
    await expect(user).toBeChecked();
    await selectDropdown.selectOption('Teacher');
    await terms.check();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy;
    await signIn.click();
    await page.locator('.card-title a').first().waitFor();
    console.log (await page.locator('.card-title a').allTextContents());
    console.log (await page.locator('.card-title a').first().textContent());
    await expect(page).toHaveTitle('ProtoCommerce');

});


