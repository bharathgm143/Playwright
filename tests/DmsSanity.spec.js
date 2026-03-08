const { test, expect } = require('@playwright/test');


test("Dms regression", async ({ page }) => {
    await page.goto("https://dmsuatweb.z23.web.core.windows.net/login");

    //await page.locator(".main-block-img").first().click();

    await page.getByPlaceholder("Email Address / Username").fill("Servicebharath");

    await page.getByRole("button", { name: "Next" }).click();

    await page.getByPlaceholder("Password").fill("Bharath@9797");

    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForLoadState("networkidle");
     
    await page.getByRole('button', { name: 'Service' }).click();
    /*

    await page.getByRole('menuitem', { name: ' Create Appointment/Quotation ' }).click();

    await page.getByPlaceholder("Select").click();

    const option = page.getByRole('option', {name: 'Vehicle Reg. No'});

    await expect(option).toBeVisible();

    await option.click();

    await page.getByPlaceholder("Search here").fill("WXX8832");

    await page.getByRole("button",{name: 'Search'}).click();

    await page.locator(".action-btn").click();

    await page.getByRole("menuitem",{name:'Create Appointment'}).click();
    
    //await page.waitForTimeout(800);

    await page.getByText('Customer & Vehicle information', { exact: true }).click();

    await page.locator('mat-label:has-text("Service History →")').click();

    await page.locator("//img[@src='../../../../assets/icons/close-black.svg']").click();

    //await page.waitForTimeout(2000);

    await page.locator(".mat-expansion-indicator").first().click();
    await page.waitForTimeout(400);
    await page.locator(".mat-expansion-indicator").last().click();
    await page.locator(".greenbtn").click();
    await page.waitForTimeout(1500);
    await page.locator(".mat-slide-toggle-content:has-text('Repair Job')").click();
    await page.locator(".greenbtn").click();
    await page.waitForTimeout(45);
    await page.getByRole('button', { name: 'Add Job' }).click();
    await page.getByPlaceholder("Select Op Code").type("D010");
    await page.locator(".ng-option").filter({hasText:' D01009 - DIAG-ENGINE - UNDER POWER '}).click();
    await page.getByPlaceholder("Select Workplace").click();
    await page.locator(".ng-option:has-text('IN - In House')").click();
    await page.getByRole("button",{name:'Save'}).click();

    await page.getByRole('button', { name: 'Service' }).click();
    */
    await page.getByRole('menuitem', { name: 'Service Activity' }).click();
    await page.getByRole('heading', { name: 'Delivery' }).click();
    await page.getByText('Search by Filter', { exact: true }).click();
    





    

});