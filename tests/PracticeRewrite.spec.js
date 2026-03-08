import {expect, test} from '@playwright/test';


test.only('Practice work', async ({ page })=>{
        await page.goto("https://rahulshettyacademy.com/client");

        const Username=page.getByPlaceholder("email@example.com");
        const Password=page.getByPlaceholder("enter your passsword");
        const Loginbtn=page.getByRole('button', {name: "Login"});

        const Products=page.locator(".card-body");
        const Prodname='ZARA COAT 3';

        const email="bharathgm63@gmail.com"

        await Username.fill(email);
        await Password.fill("Dms@123456");
        await Loginbtn.click();
        //await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();
        await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
        await page.locator("div li").first().waitFor();
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        await page.getByRole('button', {name:"Checkout"}).click();
        await page.getByPlaceholder("Select Country").pressSequentially("Ind");
        await page.getByRole('button',{name:"India"}).nth(1).click();
        await page.getByText("PLACE ORDER").click();
        await expect(page.getByText("Thankyou for the order")).toBeVisible();

        



    } );

    