import { Page, Locator } from '@playwright/test';

export class Login {
    private page: Page;
    private usernNameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    constructor(page) {
        this.page = page;
        this.usernNameField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
    async validLogin(username, password) {

        await this.usernNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}