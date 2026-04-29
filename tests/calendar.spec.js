import { test, expect } from '@playwright/test';

test('Calendar Test', async ({page}) => {

    const year = "2036"
    const month = "12"
    const day = "6"

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.locator('.react-calendar__navigation__next-button').click()
    await page.getByText(year).click()
    await page.locator('.react-calendar__tile').nth(Number(month)-1).click()
    await page.getByText('6',{exact:true}).locator('..').click()
    const date = page.locator(".react-date-picker__inputGroup__input")
    await expect(date.nth(0)).toHaveAttribute('value',month)
    await expect(date.nth(1)).toHaveAttribute('value',day)
    await expect(date.nth(2)).toHaveAttribute('value',year)
    
})

test('newTab',async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    const pagePromise = context.waitForEvent('page')
    await page.getByRole('link',{name: "Free Access to InterviewQues/ResumeAssistance/Material"}).click()
    const newPage = await pagePromise
    await newPage.waitForEvent('load')
    await expect(newPage).toHaveTitle('RS Academy')
    await newPage.getByRole('link',{name: "Courses"}).click()
    await newPage.waitForURL('https://courses.rahulshettyacademy.com/l/products?sortKey=recommended&sortDirection=asc&page=1')
    await expect(newPage).toHaveTitle('Rahul Shetty Academy')  

    
})


test("MultipleTabs", async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.hyrtutorials.com/p/window-handles-practice.html')
    const newPages = []

    const listener = page => newPages.push(page)
    context.on('page',listener)

    await page.getByText("Open Multiple Tabs", {exact:true}).click()

    await page.waitForTimeout(3000)

    context.off('page',listener)

    const[newPage1, newPage2] = newPages

    console.log(await newPage1.title())
    console.log(await newPage2.title())

    
})


test('alert', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.waitForLoadState('load')
    page.on('dialog',dialog=>dialog.accept())
    await page.getByRole('button', {name: "Alert"}).click()
    await page.waitForTimeout(1000)
    await page.getByRole('button',{name: "Hide"}).click()
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()




    
})