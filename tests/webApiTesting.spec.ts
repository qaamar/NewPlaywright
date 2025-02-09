const { test, expect, request } = require('@playwright/test');
import { APiUtils } from '../utils/APiUtils';

const loginPayload = { userEmail: "amarrkadic@gmail.com", userPassword: "Neznamja1990!" }
const orderPayload = {orders:[{country: "Argentina", productOrderedId: "67a8df56c0d3e6622a297ccd"}]}

let response;

test.beforeAll(async () => {
    
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload)

})

test('@API E2E with API login', async ({ page }) => {

    await page.addInitScript(`window.localStorage.setItem('token', '${response.token}')`)
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByRole('button', { name: '   ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const orderTable = await page.locator("tbody tr");
    for (let i = 0; i < await orderTable.count(); i++) {
        const orderIdInTable = await orderTable.nth(i).locator("th").textContent();
        if (response.orderId.includes(orderIdInTable)) {
            await orderTable.nth(i).locator("button").first().click();
            break;
        }
    }
    const summaryPageOrderId = await page.locator(".col-text.-main").textContent();
    const trimmedOrderId = response.orderId.trim().replace(/^\|+/, '').replace(/\|+$/, '').trim(); //had to trim the value as expected string wasn't enough
    expect(summaryPageOrderId.includes(trimmedOrderId)).toBeTruthy()

})


