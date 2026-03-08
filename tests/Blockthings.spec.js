
import{test, request} from "@playwright/test";


test("Block",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/client");
    page.on('request',request=>console.log(request.url()))
  page.on('response',Response=>console.log(Response.url(),Response.status()))

  //await page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
  await page.locator("#userEmail").fill("bharathgm63@gmail.com");
  await page.locator("#userPassword").fill("Dms@123456");
  await page.locator("#login").click();
  await page.screenshot({path:'login.png'});
  await page.locator(".card-body b").first().waitFor();
  

await page.pause();


    
})