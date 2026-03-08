import { test, expect } from '@playwright/test';

test("Popup validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#alertbtn").click();
    //page.on('dialog', dialog=>dialog.dismiss());

    //await page.pause();
    await page.locator("#mousehover").hover();

    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href*='lifetime-access']:visible").click();

    const reqtext = await framespage.locator(".text h2").textContent();
    console.log(reqtext.split(" ")[1]);








})