import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
    private page: Page;
    private countrySelect: Locator;
    private emailField : Locator;
    private placeOrderButton: Locator;

    constructor(page) {
        this.page = page
        this.countrySelect = page.getByPlaceholder('Select Country');
        this.emailField = page.locator('//*[@class="user__name mt-5"]//label');
        this.placeOrderButton = page.getByText('Place Order');

    }

    async selectCountry(country: string) {
        await this.countrySelect.pressSequentially(country, { delay: 100 });
        const dropdown = this.page.locator(".ta-results.list-group.ng-star-inserted");
        await dropdown.waitFor(); // Wait for the dropdown to be visible

        const countryOptions = await dropdown.locator("button");
        const countcountries = await countryOptions.count();

        for (let i = 0; i < countcountries; i++) {
            const text = await countryOptions.nth(i).textContent();
            if ((text?.trim() ?? '' )=== "India") { // Use trim() to remove extra spaces
                await countryOptions.nth(i).click();
                console.log('Country selected');
                break;
            }
        }
    }

    async verifyEmail(username: string) {
        await expect(this.emailField).toHaveText(username);
    }

    async clickOnPlaceOrder() {
        await this.placeOrderButton.click();
    }
}
