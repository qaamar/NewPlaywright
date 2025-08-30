import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrdersPage } from "./OrdersPage";  

interface Pages {

    login : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    ordersPage : OrdersPage;
}

export const Pages = (page: any): Pages => ({
    login: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    cartPage: new CartPage(page),
    checkoutPage: new CheckoutPage(page),
    ordersPage: new OrdersPage(page)
});