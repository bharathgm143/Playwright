import { expect, test } from '@playwright/test';


test.describe.configure({mode:'parallel'});
test('Browser Context Playwright Test', async ({ browser }) => {                   //Test name and Test Function async({})=>
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const siginbtn = page.locator("#signInBtn");
    const cardtitles = page.locator(".card-body a");
    console.log(await page.title());
    //css
    await username.fill("Bharath");
    await password.fill("learning");
    await siginbtn.click();
    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type/fill
    await username.fill("");
    await username.fill("rahulshettyacademy")
    await siginbtn.click();
    //console.log(await page.locator(".card-body a").textContent()); //Will return empty array
    //console.log(await cardtitles.nth(1).textContent());
    //console.log(await cardtitles.first().textContent());
    //await page.waitForLoadState('networkidle');
    await cardtitles.first().waitFor();
    const alltitles = await cardtitles.allTextContents();
    console.log(alltitles);


});
test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://google.com');
    //get title - Assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test('Select Playwright Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator("#username");
    const siginbtn = page.locator("#signInBtn");
    const blinkinglink = page.locator("[href*=documents-request]");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(blinkinglink).toHaveAttribute("class", "blinkingText");
    //await page.pause();

});
test.only('handling child window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkinglink = page.locator("[href*=documents-request]");
    const username = page.locator("#username");

    const [newpage] = await Promise.all([    //[newpage, newpage 1] 
        context.waitForEvent('page'), //listen for any new page pending,rejected,fulfilled
        blinkinglink.click(),
    ])

    const text = await newpage.locator(".red").textContent();
    const arraytext = text.split("@")
    const domain = arraytext[1].split(" ")[0]
    console.log(domain); //to get text content

    await username.fill(domain)
    await page.pause();
    console.log(await username.inputValue()); //Inputvalue to get input text

});