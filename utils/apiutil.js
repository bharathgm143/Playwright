class apiutil{

constructor(apiContext, loginpayload){
  this.apiContext=apiContext;
  this.loginpayload=loginpayload;


}
async gettoken(){
  const loginresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginpayload });

  const loginResponsejson = await loginresponse.json();
  const token = await loginResponsejson.token;
  console.log(token);
  return token;
}

async createorder(orderpayload){
     let response={};
     response.token=await this.gettoken();
  const orderresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderpayload,
      headers: {
        'authorization': response.token,
        'content-type': 'application/json'
      },
    });
    const orderresponsejson = await orderresponse.json();
    const orderid = await orderresponsejson.orders[0];
    console.log(orderid);
    response.orderid=orderid;
    return response;
}

}
module.exports={apiutil};
