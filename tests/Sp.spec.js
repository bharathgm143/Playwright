const {test, expect} =require('@playwright/test')

test("Sp", async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingtext=await page.locator(".blinkingText");
    const username=await page.locator("#username");

    const[newpage]=await Promise.all([
        context.waitForEvent('page'),
        blinkingtext.click(),  
    ])
    const text=await newpage.locator(".red").textContent();
    const arraytext=text.split("@");
    const domaintxt=arraytext[1].split(" ")[0];
    console.log(domaintxt);

    username.fill(domaintxt);
    await page.pause();
    console.log(await username.inputValue());

    });
   
test("basics", async({page})=>{
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /*
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#alertbtn").click();
    page.on('dialog', dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog=>dialog.dismiss());
    
   await page.locator("#mousehover").hover();
   await page.screenshot({path:'Mouseover.png'});
   */

   const framepage=page.frameLocator("#courses-iframe");
   
});
test("APIpayloadinterface", async({page})=>{

    const fakeorderpayload={data:[], message:"no order found"};

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("bharathgm63@gmail.com")
    await page.locator("#userPassword").fill("Dms@123456")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle');
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{
        const response=await page.request.fetch(route.request());
        let body=JSON.stringify(fakeorderpayload);
        route.fulfill({
            response,
            body,
        });
    } );
    await page.locator('[routerlink*=myorders]').click();
    await expect( page.locator(".mt-4")).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");

});

test("APIheaderinterface", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("bharathgm63@gmail.com")
    await page.locator("#userPassword").fill("Dms@123456")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle');

    await page.locator('[routerlink*=myorders]').click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69a27179415d779f9b4aec90"})
    )
    await page.locator("button:has-text('view')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

});

test.only("Calfunction", async({page})=>{


    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const month="11"
    const date="14"
    const year="1996"
    const expecteddate=[month,date, year];
    
    await page.locator("[class*=react-date-picker__inputGroup__year]").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    const targetyear=Number(year);
    while(true){
    const displayedyesr=await page.locator(".react-calendar__tile").allTextContents();
    console.log(displayedyesr);

    if(displayedyesr?.includes(year)){
        break;
    }
    const firstyear=Number(await page.locator(".react-calendar__decade-view__years__year").first().textContent());
    if(targetyear>firstyear){
        await page.locator(".react-calendar__navigation__next-button").click();
    }else {
    await page.locator(".react-calendar__navigation__prev-button").click();   

    }
}
await page.locator(".react-calendar__decade-view__years__year").getByText(year, { exact: true }).click();
    await page.locator(".react-calendar__year-view__months button").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs= page.locator('.react-date-picker__inputGroup__input');

    for (let i=0; i<expecteddate.length; i++){
        const values=await inputs.nth(i).inputValue();
        expect(values).toEqual(expecteddate[i]);
        
    }
 


    



});
