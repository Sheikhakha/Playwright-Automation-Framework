import {test,expect} from '@playwright/test';


test('staticDropdown', async ({page}) => {
    
    const username = page.locator('#username');
    const password = page.locator('#password');
    const user = page.locator('.checkmark').nth(1);
    const selectDropdown = page.locator('select.form-control');
    const signIn = page.locator('#signInBtn');
    const terms = page.locator('#terms');

    // Navigate to the login page and verfiy the title
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    // Enter username & pwd
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');

    // Click on user radio button and verify it is checked.
    await user.click();
    await page.locator('#okayBtn').click();
    await expect(user).toBeChecked();

    // Select a option from select dropdown
    await selectDropdown.selectOption('Teacher');

    // Check on terms checkbox and verify
    await terms.check();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await signIn.click();
    await page.locator('.card-title a').first().waitFor();
    console.log (await page.locator('.card-title a').allTextContents());
    console.log (await page.locator('.card-title a').first().textContent());

    // check title and ensure navigation
    await expect(page).toHaveTitle('ProtoCommerce');

});


