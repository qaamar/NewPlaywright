import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    private productAddedToCart: Locator;

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.productAddedToCart = page.getByLabel('Product Added To Cart');
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
    
    async isProductAddedToCart() {
        await expect(this.productAddedToCart).toBeVisible();
    }
 
}