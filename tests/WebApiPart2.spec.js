import { expect, test, request } from '@playwright/test';
import { apiutil } from '../utils/apiutil';

const loginpayload = { userEmail: "bharathgm63@gmail.com", userPassword: "Dms@123456" };
const orderpayload = { "orders": [{ "country": "India", "productOrderedId": "6960eac0c941646b7a8b3e68" }] }

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

  await page.locator("[routerlink*=myorders]").first().click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {
    const roworderid = await rows.nth(i).locator("th").textContent();
    if (response.orderid.includes(roworderid)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const Orderdetails = await page.locator(".col-text").textContent();
  expect(response.orderid.includes(Orderdetails)).toBeTruthy();
  await page.pause();
});

