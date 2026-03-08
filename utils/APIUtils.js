class APIUtils {


    constructor(apiContext, loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;

    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token; // not a function

        console.log(token);
        return token;
    }

    async ceateOrder(orderPayload){
        let response={};
        response.token=await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'

            },
        })
    const orderResponsejson = await orderResponse.json();
    console.log(orderResponsejson)
    const orderId = orderResponsejson.orders[0];
    response.orderId=orderId;
    return response;

    }
}
module.exports= {APIUtils};