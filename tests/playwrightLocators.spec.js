import { test, expect } from '@playwright/test';

test('Playwright Locators on RSA client', async ({ page }) => {

    // Navigate to Client app
    await page.goto('https://rahulshettyacademy.com/client');
    const item = 'ADIDAS ORIGINAL';
    const mail = 'sheik@gmail.com';
    await expect(page).toHaveTitle("Let's Shop");

    // fill valid credentials
    await page.getByPlaceholder('email@example.com').fill(mail);
    await page.getByPlaceholder('enter your passsword').fill('Qb@12345');
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page.locator("p[style*='margin-top']")).toHaveText("Automation Practice");

    // add item to cart
    await page.locator(".card-body").filter({ hasText: item }).getByRole('button', { name: 'Add To Cart' }).click();

    // navigate to cart and place order and capture orderId in a variable
    await page.getByRole('listitem').filter({ has: page.getByRole('button', { name: 'Cart' }) }).click();
    await expect(page.getByRole('heading', { name: item })).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('.item__title')).toHaveText(/adidas original/i);
    await page.getByPlaceholder("Select Country").pressSequentially('ind');
    await page.getByRole('button').filter({ hasText: 'India' }).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByRole('heading', { name: "Thankyou for the order." })).toBeVisible();
    await expect(page.getByText(item)).toBeVisible();
    const orderText = await page.getByRole('table').allTextContents();
    const orderId = orderText[0].split('|')[1].trim();

    // navigate to my orders page and verify order details
    await page.getByRole('listitem').filter({ hasText: 'ORDERS' }).click();
    await expect(page.getByRole('rowheader', { name: orderId })).toBeVisible();
    await page.getByRole('row').filter({ hasText: orderId }).getByRole('button', { name: "View" }).click();
    await expect(page.getByText("order summary")).toBeVisible();
    await expect(page.getByText(orderId)).toBeVisible();
    const deliveryEmail = page.locator('div.address', {hasText: "Delivery Address"}).getByText(mail);
    await expect(deliveryEmail).toBeVisible();

})