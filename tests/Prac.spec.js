import { expect, test, request } from '@playwright/test';
import { apiutils } from '../utils/apiutil';


const loginPayload={userEmail: "bharathgm63@gmail.com",userPassword: "Dms@123456"}
const orderPayload={"orders": [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let response;


test.beforeAll(async ()=>{
    const apiContext=await request.newContext();
    const APIUtils=new apiutils(apiContext,loginPayload);
    response=await APIUtils.createOrder(orderPayload);
    
})


test('Practice work', async ({ page }) => {

  page.addInitScript(value=>{
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  //const Username = page.locator("#userEmail");
  //const Password = page.locator("#userPassword");
  //const Loginbtn = page.locator("#login");

  //const Products = page.locator(".card-body");
  //const Prodname = 'ZARA COAT 3';

  //const email = "bharathgm63@gmail.com"

  //wait Username.fill(email);
  //await Password.fill("Dms@123456");
  //await Loginbtn.click();
  //await page.waitForLoadState('networkidle');
  //await page.locator(".card-body b").first().waitFor();
  //const alltitlecards = await page.locator(".card-body b").allTextContents();
  //console.log(alltitlecards);
 /*
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

  */
  await page.locator("[routerlink*=myorders]").first().click();
    await page.locator("tbody").waitFor();

    const rows=await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i){
    const roworderid=await rows.nth(i).locator("th").textContent();
    if(orderId.includes(roworderid)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
    }
    const Orderdetails=await page.locator(".col-text").textContent();
    expect (orderId.includes(Orderdetails)).toBeTruthy();
    await page.pause();



});

