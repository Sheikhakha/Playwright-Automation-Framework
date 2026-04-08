import {test, expect} from '@playwright/test';

test('Playwright Locators on RSA client', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    const item = 'ADIDAS ORIGINAL';
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByPlaceholder('email@example.com').fill('sheik@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Qb@12345');
    await page.getByRole('button',{name: "Login"}).click();
    await expect(page.locator("p[style*='margin-top']")).toHaveText("Automation Practice");
    await page.locator(".card-body").filter({hasText: item}).getByRole('button', {name: 'Add To Cart'}).click();
    await page.getByRole('listitem').filter({has:page.getByRole('button',{name: 'Cart'})}).click();
    await expect(page.getByRole('heading',{name: item})).toBeVisible();
    await page.getByRole('button', {name: 'Checkout'}).click();
    await expect(page.locator('.item__title')).toHaveText(/adidas original/i); 
    // await page.locator("[name='coupon']").fill('rahulshettyacademy');
    // await page.getByRole('button', {name: 'Apply Coupon'}).click();
    // await expect(page.getByText("* Coupon Applied")).toBeVisible();
    await page.getByPlaceholder("Select Country").pressSequentially('ind');
    await page.getByRole('button').filter({hasText: 'India'}).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByRole('heading', {name:"Thankyou for the order." })).toBeVisible();
    await expect(page.getByText(item)).toBeVisible();
    const orderText = await page.getByRole('table').allTextContents();
    const orderId = orderText[0].split('|')[1].trim();

    await page.getByRole('listitem').filter({hasText: 'ORDERS'}).click();
    await expect(page.getByRole('rowheader', {name: orderId})).toBeVisible();

    await page.getByRole('row').filter({hasText: orderId}).getByRole('button', {name: "View"}).click();
    // alternative of above filter is the below one
    // const row = page.locator('tbody tr');
    // for(let i=0; i < await row.count(); i++){
    //     console.log(await row.nth(i).locator('th').textContent())
    //     if(orderId.includes(await row.nth(i).locator('th').textContent())){
    //         await row.nth(i).locator('button').first().click()
    //         break;
    //     }}

    await expect(page.getByText("order summary")).toBeVisible();
    await expect(page.getByText(orderId)).toBeVisible();
    await expect(page.getByText("sheik@gmail.com").last()).toBeVisible();

})