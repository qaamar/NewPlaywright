import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    private page: Page;
    private products: Locator;
    private productsText: Locator;
    private cart: Locator;
    private sideBarCategory: Locator;
    constructor(page) {
        this.page = page;
        this.products = this.page.locator(".card-body");
        this.productsText = this.page.locator(".card-body b");
        this.cart = page.getByRole('button', { name: '   Cart' });
    }

    async searchProducts(productName) {

        const count = await this.products.count();
        let productFound = false;
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                productFound = true;
                break;
            }
        }
        if (!productFound) { throw new Error('Failed to find product'); }
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async checkCategory(categoryName : string) {
        this.sideBarCategory = this.page.locator('#sidebar div').filter({ hasText: new RegExp(`^${categoryName}$`) }).getByRole('checkbox');
        await this.sideBarCategory.click();
        expect(this.sideBarCategory).toBeChecked();
    }
}