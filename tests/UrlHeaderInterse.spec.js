import { expect, test } from '@playwright/test';


test.only('Ui header interse', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill("bharathgm63@gmail.com");
  await page.locator("#userPassword").fill("Dms@123456");
  await page.locator("#login").click();
  await page.locator(".card-body b").first().waitFor();

  await page.locator("[routerlink*=myorders]").first().click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=> route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=78595871c941646b7ad880d5"})
  )
  await page.locator("button:has-text('view')").first().click();
  await (expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order"));

});

