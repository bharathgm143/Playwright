import { expect, test } from '@playwright/test';

let webContext;
const email="bharathgm63@gmail.com";



test.beforeAll(async ({browser})=>{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Dms@123456");
await page.locator("#login").click();
await page.locator(".card-body b").first().waitFor();
await context.storageState({path: 'state.json'});
webContext=await browser.newContext({storageState:'state.json'})

})


test('Practice work', async () => {

  const Prodname = 'ZARA COAT 3';
  const page=await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const Products = page.locator(".card-body");
  await page.locator(".card-body b").first().waitFor();
  const alltitlecards = await page.locator(".card-body b").allTextContents();
  console.log(alltitlecards);

  const count = await Products.count();
  for (let i = 0; i < count; ++i) {
    if (await Products.nth(i).locator("b").textContent() === Prodname) {
      await Products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*=cart]").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //pseudo function
  expect(bool).toBeTruthy();

  await page.locator("[type='button']").last().click();
  //await page.pause();

  await page.getByPlaceholder("Select Country").pressSequentially("Ind", { delay: 150 });
  const Dropdown = page.locator(".ta-results");
  await Dropdown.waitFor();
  const Optionscount = await Dropdown.locator("button").count();
  for (let i = 0; i < Optionscount; ++i) {
    const text = await Dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await Dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".btnn").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderid);

  await page.locator("[routerlink*=myorders]").first().click();
    await page.locator("tbody").waitFor();

    const rows=await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i){
    const roworderid=await rows.nth(i).locator("th").textContent();
    if(orderid.includes(roworderid)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
    }
    const Orderdetails=await page.locator(".col-text").textContent();
    expect (orderid.includes(Orderdetails)).toBeTruthy();
    await page.pause();



});

