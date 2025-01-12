import exp from 'constants';

const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
import { LoginPage } from '../page/LoginPage';
import { DashboardPage } from '../page/DashboardPage';
import { CartPage } from '../page/CartPage';
import { CheckoutPage } from '../page/CheckoutPage';
import { OrdersPage } from '../page/OrdersPage';
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));


// kod trazenja selektora koristi ovo
// za ID koristimo #id
// za class koristimo .class ili tagname.class npr select.form-control
// za tag koristimo tagname
// za atribut koristimo [attribute='value'] npr [type='text']
// za text koristimo text=''
// za child koristimo npr (.parent .child)
test('First test', async ({ page, browser }) => {
    // const context = await browser.newContext(); //this helps opening new clear browser
    //const newPage = await context.newPage();
    await page.goto('https://uat-app.spotlightyms.com/login');
    console.log(await page.title());
    await expect(page).toHaveTitle('Spotlite');
    //Login
    await page.locator('[type=text]').fill('akds');
    await page.locator('[type=password]').fill('123456');
    await page.locator(".MuiButton-label").click();
    //Navigate to Arrivals and departures
    await page.getByRole('button', { name: 'Arrive/Depart trailers' }).click();
    //Arrive a trailer
    await page.locator('.MuiGrid-root > div:nth-child(2) > .MuiButtonBase-root').click();
    const currentDateTime = getCurrentDateTimeString();
    console.log(`TAK${currentDateTime}`);

    function getCurrentDateTimeString() {
        const now = new Date();

        // Get year, month, and day
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

        // Get hours and minutes
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0')

        // Format date and time
        const dateTimeString = `${month}${day}${year}${hours}${minutes}${seconds}`;
        return dateTimeString;
    }
})
test('RahulTestPage', async ({ page }) => {
    const usernNameField = page.getByLabel('Username:');
    const passwordField = page.getByLabel('Password:');
    const submitButton = page.getByRole('button', { name: 'Sign In' });
    const cardTitles = page.locator(".card-title a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await usernNameField.fill('rahulshettyacademy');
    await passwordField.fill('learning');
    await submitButton.click();
    //await page.pause()
    //console.log(await cardTitles.nth(0).textContent())

    const allTitels = await cardTitles.allTextContents();
    console.log(allTitels);
})

test('UI basics', async ({ page }) => {
    const usernNameField = page.getByLabel('Username:');
    const passwordField = page.getByLabel('Password:');
    const submitButton = page.getByRole('button', { name: 'Sign In' });
    const blinkingText = page.locator("[href*='documents-request']")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await usernNameField.fill('rahulshettyacademy');
    await passwordField.fill('learning');
    const dropdown = page.locator("select.form-control");
    const tAndCbox = page.getByLabel('I Agree to the terms and')
    await page.pause();
    await tAndCbox.click()
    await expect(page.getByLabel('I Agree to the terms and')).toBeChecked() //action is outside
    await page.pause();
    await tAndCbox.uncheck()
    expect(await tAndCbox.isChecked()).toBeFalsy(); //await is used inside because action is inside
    await page.pause();
    await expect(blinkingText).toHaveAttribute("class", "blinkingText")
    await dropdown.selectOption("consult")
    await submitButton.click();

    //await page.pause();
    //await expect(page.locator("sdasda")) 
})

test('E2E test with POM', async ({ page }) => {

    //#region Objects
    const login = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const ordersPage = new OrdersPage(page);

    //#endregion

    await login.goto();
    await login.validLogin(dataSet.username, dataSet.password);

    await page.waitForLoadState('networkidle') //not the best practice
    await dashboardPage.searchProducts(dataSet.productName);

    //Navigate to cart and assert
    await dashboardPage.navigateToCart();
    await expect(page.getByText(dataSet.productName)).toBeVisible();

    //Proceed to checkout
    await cartPage.clickCheckoutButton();
    await cartPage.isProductAddedToCart();

    //Checkout form
    await checkoutPage.selectCountry('Ind');
    await checkoutPage.verifyEmail(dataSet.username);
    await checkoutPage.clickOnPlaceOrder();

    //Summary page
    await cartPage.verifyThankYouMsg();
    const orderId = await cartPage.getOrderId();
    //console.log(orderId);
    await ordersPage.clickOnOrdersButton();

    await page.locator("tbody").waitFor();
    await ordersPage.verifyOrderIdAndClickOnFirst(orderId);
    await ordersPage.verifyOrderSummary();
   



})

customtest('E2E using fixtures', async ({ page,testDataForOrder }) => {

    //#region Objects
    const login = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const ordersPage = new OrdersPage(page);

    //#endregion

    await login.goto();
    await login.validLogin(testDataForOrder.username, testDataForOrder.password);

    await page.waitForLoadState('networkidle') //not the best practice
    await dashboardPage.searchProducts(testDataForOrder.productName);

    //Navigate to cart and assert
    await dashboardPage.navigateToCart();
    await expect(page.getByText(testDataForOrder.productName)).toBeVisible();
})

