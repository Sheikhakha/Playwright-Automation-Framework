import {test, expect, request} from '@playwright/test';

let token
test.beforeAll(async () => {
    const loginPayload = {userEmail:"sheik@gmail.com",userPassword:"Qb@12345"}
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload})
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token
    console.log(token)


    // const orderPayload = {orders: [{country: "Equatorial Guinea", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}
    // const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    //     {data: orderPayload, headers: {
    //         'Authorization':token, 
    //         'Content-Type': 'application/json'}
    //     }
    // )
    // const createOrderResponseJson = await createOrderResponse.json()
    // console.log(createOrderResponseJson.orders[0])

    
})

test('test', async ({page}) => {
    await page.addInitScript(value=> window.localStorage.setItem('token',value), token)
    await page.goto('https://rahulshettyacademy.com/client/')
    // await page.pause()
    
})