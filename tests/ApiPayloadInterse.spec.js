import { expect, test, request } from '@playwright/test';
import { apiutil } from '../utils/apiutil';
import { json } from 'node:stream/consumers';

const loginpayload = { userEmail: "bharathgm63@gmail.com", userPassword: "Dms@123456" };
const orderpayload = { "orders": [{ "country": "India", "productOrderedId": "6960eac0c941646b7a8b3e68" }] }
const fakeorderpayload={
    data:[], message:"no order found"}


let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const Apiutil=new apiutil(apiContext,loginpayload);
  response=await Apiutil.createorder(orderpayload);

})

test('Practice work', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  async route=>{
  const response=await page.request.fetch(route.request());
    let body=JSON.stringify(fakeorderpayload);
    route.fulfill({
        response,
        body,
    });
    });

  await page.locator("[routerlink*=myorders]").first().click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

  await page.pause();
});

