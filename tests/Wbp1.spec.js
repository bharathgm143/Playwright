const {test, expect, request}=require("@playwright/test");

const loginpayload={
    userEmail: "bharathgm63@gmail.com", userPassword: "Dms@123456"};

const orderpayload={orders: [{country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};

let token;



test.beforeAll( async()=>{
const apicontext=await request.newContext();
const loginresponse=await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {data:loginpayload});

const loginresponsejson=await loginresponse.json();
token=await loginresponsejson.token;
console.log(token);

const orderresponse=await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {data: orderpayload, headers:{
'Authorization': token,
'Content-Type': 'application/json'
}, 
});
const orderresponsejson=await orderresponse.json();
const orderid=await orderresponsejson.orders[0];
console.log(orderid);
})
test("api test",async ({page})=>{
page.addInitScript(value=>{
    window.localStorage.setItem('token',value)
}, token);

await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

await page.locator("[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows=await page.locator("tbody tr");






});