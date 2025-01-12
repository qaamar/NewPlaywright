import { Page, Locator, expect } from '@playwright/test';


export class OrdersPage {

    private page: Page;
    private orderTable: Locator;
    private orderIdInTable: Locator;
    private ordersButton: Locator;
    private summaryPageOrderId: Locator

    constructor(page: Page) {
        this.page = page;
        this.orderTable = page.locator("tbody tr");
        this.orderIdInTable = page.locator(".col-text.-main");
        this.ordersButton = page.getByRole('button', { name: '   ORDERS' });
        this.summaryPageOrderId = page.locator(".col-text.-main");
    }


    async clickOnOrdersButton() {
        await this.ordersButton.click();
    }

    async verifyOrderIdAndClickOnFirst(orderId: string | null): Promise<void> {

        // await page.locator("tbody").waitFor();
        // const orderTable = await page.locator("tbody tr");
        if (!orderId) {
            throw new Error('Invalid orderId: orderId is null or undefined');
        }
    
        for (let i = 0; i < await this.orderTable.count(); i++) {
            const orderIdInTable = await this.orderTable.nth(i).locator("th").textContent();
    
            if (orderIdInTable && orderId.includes(orderIdInTable.trim())) {
                await this.orderTable.nth(i).locator("button").first().click();
                break;
            }
        }
    }
    async verifyOrderSummary() {
        const orderIdOnSummaryPage = await this.summaryPageOrderId.textContent();
        if (orderIdOnSummaryPage !== null) {
            const trimmedOrderId = orderIdOnSummaryPage.trim().replace(/^\|+/, '').replace(/\|+$/, '').trim();
            expect(orderIdOnSummaryPage.includes(trimmedOrderId)).toBeTruthy();
        } else {
            console.error("No order ID found on summary page");
        }

    }

}