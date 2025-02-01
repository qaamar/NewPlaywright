import exp from 'constants';

const { test, expect } = require('@playwright/test');

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
test('@ui RahulTestPage', async ({ page }) => {
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

test('E2E test', async ({ page }) => {
    const usernNameField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const loginButton = page.getByRole('button', { name: 'Login' });

    //const product = page.()
    const email = 'amarrkadic@gmail.com';
    const productName = 'IPHONE 13 PRO';
    await page.goto('https://rahulshettyacademy.com/client/');
    await usernNameField.fill(email);
    await passwordField.fill('Neznamja1990!');
    await loginButton.click();
    await page.waitForLoadState('networkidle') //not the best practice
    const product = await page.locator(".card-body");
    const count = await product.count();
    let productFound = false;
    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator("b").textContent() === productName) {
            await product.nth(i).locator("text= Add To Cart").click();
            console.log('Product found');
            productFound = true;
            break;
        }
    }
    if (!productFound) { throw new Error('Failed to find product'); }
    //Navigate to cart and assert
    await page.getByRole('button', { name: '   Cart' }).click();
    await expect(page.getByText(productName)).toBeVisible();
    //Proceed to checkout
    await page.getByRole('button', { name: 'Checkout❯' }).click();
    await expect(page.getByLabel('Product Added To Cart')).toBeVisible();
    //Checkout form
    await page.getByPlaceholder('Select Country').pressSequentially('Ind', { delay: 100 });
    const dropdown = page.locator(".ta-results.list-group.ng-star-inserted");
    await dropdown.waitFor(); // Wait for the dropdown to be visible

    const countryOptions = await dropdown.locator("button");
    const countcountries = await countryOptions.count();

    for (let i = 0; i < countcountries; i++) {
        const text = await countryOptions.nth(i).textContent();
        if (text.trim() === "India") { // Use trim() to remove extra spaces
            await countryOptions.nth(i).click();
            console.log('Country selected');
            break;
        }
    }

    const emailField = page.locator('//*[@class="user__name mt-5"]//label')
    await expect(emailField).toHaveText(email);
    await page.getByText('Place Order').click();
    await page.pause();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderId);
    await page.getByRole('button', { name: '   ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const orderTable = await page.locator("tbody tr");
    for (let i = 0; i < await orderTable.count(); i++) {
        const orderIdInTable = await orderTable.nth(i).locator("th").textContent();
        if (orderId.includes(orderIdInTable)) {
            console.log(orderIdInTable);
            await orderTable.nth(i).locator("button").first().click();
            break;
        }
    }
const summaryPageOrderId = await page.locator(".col-text.-main").textContent();
const trimmedOrderId = orderId.trim().replace(/^\|+/, '').replace(/\|+$/, '').trim(); //had to trim the value as expected string wasn't enough
console.log(trimmedOrderId);
expect(summaryPageOrderId.includes(trimmedOrderId)).toBeTruthy();


    //const successText = await page.locator('.hero-primary');



})

