import { expect, test,} from '@playwright/test';
const {custometest}=require('../utils/test-base');
const {POManager}=require("../pageobjects/POManager");
//external files to playwright test
//json-->sting-->json object (json.stringify)
const dataset =require("../utils/placeorderTestData.json"); //external files to playwright test


for (const data of dataset){
test(`client appnlogin for ${data.productName}`, async ({ page }) => { //parameterization in runing tests
});
}

custometest.only(`client appnlogin`, async({ page,testDataForOrder }) => {
  const pomanager=new POManager(page)
  const Products = page.locator(".card-body");
  const email = "bharathgm63@gmail.com"

  const loginPage=pomanager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testDataForOrder.username,testDataForOrder.passwword)

  const dashboardpage=pomanager.getDashboardPage();
  await dashboardpage.searchProductAddCart(testDataForOrder.productName)
  await dashboardpage.navigatetocart();

  const cartpage=pomanager.getCartPage();
  await cartpage.VerifyProductIsDisplayed(testDataForOrder.productName)
  await cartpage.Checkout();

  const ordersreviewpage=pomanager.getOrdersReviewPage();
  await ordersreviewpage.searchCountryAndSelect("ind","India");
  await ordersreviewpage.VerifyEmailId(email);
  const orderid=await ordersreviewpage.SubmitAndGetOrderId()
  console.log(orderid);
  await dashboardpage.navigatetoorders();
  
  const ordershistorypage=pomanager.getOrdersHistoryPage();
  await ordershistorypage.searchOrderAndSelect(orderid)
  expect(orderid.includes(await ordershistorypage.getOrderId())).toBeTruthy();

});
