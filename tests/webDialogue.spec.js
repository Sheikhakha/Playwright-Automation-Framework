import { test, expect } from "playwright/test";
import { text } from "stream/consumers";

test("Web dialogue handling", async ({ page }) => {
    // Navigate to the page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // Click the button that triggers the web dialogue and validate the alert text
    let text;
    await page.getByPlaceholder('Enter Your Name').fill('Sheik');
    page.on('dialog', dialog => {
        text = dialog.message()
        dialog.accept();
    });
    await page.locator('#confirmbtn').click();
    expect(text).toContain('Sheik');
    
});

test("Frames Test", async({page})=>{
    // Navigate to the page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Get frame using the frame locator and then interact
    const framesPage =  page.frameLocator('#courses-iframe');
    await framesPage.getByRole('list').getByRole('link', {name: 'All Access plan'}).click();

    // extract the subscriber count and verify
    const actualSubscribersCount = '13,522'
    const expecetedCount = (await framesPage.getByText('Happy Subscibers!').textContent()).split(' ')[1];
    expect(expecetedCount).toBe(actualSubscribersCount);

})