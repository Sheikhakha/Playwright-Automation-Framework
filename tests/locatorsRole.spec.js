import {test, expect} from '@playwright/test';
import { link } from 'fs';

test('get by role locator test', async({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');


    await page.goto('https://rahulshettyacademy.com/client')
    await expect(page).toHaveTitle("Let's Shop");
    await userName.fill('sheik@gmail.com');
    await password.fill('Qb@12345');
    await login.click();
    await page.waitForLoadState();
    //assert the page title
    await expect(page).toHaveTitle("Let's Shop");

    //enter iphone in search box and click enter
    await page.getByRole('textbox', {name: 'search'}).fill('iphone');
    await page.getByRole('textbox', {name: 'search'}).press('Enter');
    await expect(page.getByRole('heading', {name: 'ZARA COAT 3'})).toBeHidden();
    await page.getByRole('button', {name: 'Add To Cart'}).click();

    //ensure product is added to acrt
    await expect(page.getByText('Product Added to Cart')).toBeVisible();
    await page.getByRole('listitem').filter({hasText: 'Cart'}).click();

    //assert My Cart to ensure the next page is loaded
    await expect(page.getByRole('heading', {name: 'My Cart'})).toBeVisible();

    await page.getByRole('button', {name: 'Checkout'}).click();
    await expect(page.getByText('Personal Information')).toBeVisible();
    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.getByRole('button').filter({has: page.getByText('India',{exact:true})}).click();
    await expect(page.getByRole('button', {name: 'Apply Coupon'})).toBeVisible();
    await page.locator('a.btnn').click();
    await page.pause();


})