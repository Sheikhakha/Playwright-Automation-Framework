import {test, expect} from '@playwright/test';

test('RahulShetty Lets Shop', async({page})=>{

    const url = 'https://rahulshettyacademy.com/client';
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const alert = page.locator('.toast-container');
    const products = page.locator('.card-body');
    const cart = page.locator("button[routerlink*='cart']");

    await page.goto(url)
    await expect(page).toHaveTitle("Let's Shop");
    await userName.fill('sheik@gmail.com');
    await password.fill('Qb@1234511111');
    await login.click();
    await expect(alert).toContainText('Incorrect');
    await password.fill('Qb@12345');
    await login.click();
    await page.waitForLoadState('load');
    // await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(alert).toContainText('Login');

    for(let i=0; i < await products.count(); i++) {
        console.log(await products.locator('b').nth(i).textContent());
        if(await products.locator('b').nth(i).textContent()==='iphone 13 pro'){
          await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await expect(alert).toHaveText(' Product Added To Cart ');
    await cart.click();
    await page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/cart');
    await expect(page.locator("h3:has-text('IPHONE 13 PRO')")).toBeVisible();
    await page.locator("button[type='button']:has-text('Checkout')").click();
    await page.locator("[name='coupon']").fill('rahulshettyacademy');
    await page.locator("[type='submit']").click();
    await expect(page.locator("p[class*='inserted']")).toHaveText('* Coupon Applied');
    await expect(page.locator(".user__name label")).toHaveText('sheik@gmail.com');
    await page.locator("input[placeholder='Select Country']").pressSequentially('ind');
    await page.locator("span:text-is(' India')").click();
    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderText = await page.locator("label[class*='inserted']").textContent();
    const orderId = orderText.split(' | ')[1];
    await page.locator("button[routerlink*='myorders']").click();
    const orderBody = page.locator("tbody");
    await orderBody.first().waitFor();

    for(let i=0; i < await orderBody.count(); i++){



        if(await orderBody.nth(i).locator('th').textContent() === orderId){
            await orderBody.nth(i).locator('button').first().click();
            break;            
        }

    }

    await page.locator('.col-text').waitFor();
    const finalOrder = await page.locator('.col-text').textContent();
    expect(finalOrder===orderId).toBeTruthy();


    


})