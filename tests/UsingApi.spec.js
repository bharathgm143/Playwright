import { test, expect, request,} from '@playwright/test';

const {APIUtils}=require('../utils/APIUtils');
const loginPayload = {userEmail: "bharathgm63@gmail.com",userPassword: "Dms@123456"}
const orderPayload = {orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let response;



test.beforeAll(async () => {

    //login api
    const apiContext = await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.ceateOrder(orderPayload);
})
  
test('@API Place the order', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const email = "bharathgm63@gmail.com"
    const Prodname = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink*=myorders]").first().click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const roworderid = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(roworderid)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const Orderdetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(Orderdetails)).toBeTruthy();




});

