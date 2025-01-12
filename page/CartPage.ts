import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    private productAddedToCart: Locator;
    private thankYouMsg: Locator;
    private orderId: Locator;


    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.productAddedToCart = page.getByLabel('Product Added To Cart');
        this.thankYouMsg = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async isProductAddedToCart() {
        await expect(this.productAddedToCart).toBeVisible();
    }

    async verifyThankYouMsg() {
        await expect(this.thankYouMsg).toHaveText(" Thankyou for the order. ");
    }

    async getOrderId(): Promise<string> {
        const orderId = await this.orderId.textContent();
        if (!orderId) {
            throw new Error('Order ID element is empty or not found');
        }
        return String(orderId).trim(); // Explicitly cast to string
    }

}