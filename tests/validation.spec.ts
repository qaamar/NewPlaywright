import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    //henldanje elemenata da li su visible ili nisu
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //hendlanje dialoga na pageu koji nisu dio pagea
    page.on('dialog', dialog => dialog.accept());

    await page.locator('#confirmbtn').click();

    //henldanje hoveranja
    await page.locator('#mousehover').hover();

    //hendlanje iframe / frame na pageu
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('a[href*="learning-path"]:visible').click();
    const textCheck = await frame.locator('h1').textContent();
    expect(textCheck).toContain('LEARNING PATHS');

})