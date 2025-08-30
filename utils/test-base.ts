import { test as baseTest } from '@playwright/test';

// Define the type for your custom test data
interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

// Extend the base test to include custom test data
export const customtest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: async ({}, use) => {
    await use({
      username: "amarrkadic@gmail.com",
      password: "Neznamja1990!",
      productName: "IPHONE 13 PRO",
    });
  },
});
