import { expect, test, request } from '@playwright/test';

const loginpayload = { userEmail: "bharathgm63@gmail.com", userPassword: "Dms@123456" };
const orderpayload = { "orders": [{ "country": "India", "productOrderedId": "6960eac0c941646b7a8b3e68" }] }

let token;
let orderid;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: loginpayload
            });

        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token; // not a function

        console.log(token);
     const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderpayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'

            },
        })
    const orderResponsejson = await orderResponse.json();
    orderid = orderResponsejson.orders[0];
    console.log(orderid);
})

test('Practice work', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("[routerlink*=myorders]").first().click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {
    const roworderid = await rows.nth(i).locator("th").textContent();
    if (orderid.includes(roworderid)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const Orderdetails = await page.locator(".col-text").textContent();
  expect(orderid.includes(Orderdetails)).toBeTruthy();
  await page.pause();



});

