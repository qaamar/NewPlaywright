export class APiUtils {

    apiContext: any;
    loginPayload: any;
    
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    } //da bi koristili apiContext iz test klase moramo kreirati ovaj konstruktor - za TS trazi i deklarisanje gore iznad\
    
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
        const jsonResponse = await loginResponse.json();
        const token = jsonResponse.token;
        return token;
    }

    async createOrder(orderPayload) {
        
     const token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            }
        )
        const orderJsonResponse = await orderResponse.json();
        const orderId = orderJsonResponse.orders[0]
        
        let response = {
            token: token,
            orderId: orderId,
        } //kreirali smo ovaj objekat koji cemo vratiti iz metode koju pozivamo u test klasi i koji sadrzi token i orderId

        return response

    }
}