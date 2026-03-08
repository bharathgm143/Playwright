import { test, expect } from "@playwright/test";

test("dms test", async ({ page }) => {

  await page.goto("https://stdmswebqasea.z23.web.core.windows.net/");

  // Login
  await page.locator(".logoimg-main").click();

  await page.getByPlaceholder("Email Address / Username")
    .fill("bnpbharath");

  await page.getByRole("button", { name: "Next" }).click();

  await page.getByPlaceholder("Password")
    .fill("Bharath@1996");

  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForLoadState("networkidle");


  // -------- USER SWITCH LOGIC --------

  const expectedUser = "Bharath 021 - MCSO";
  const dropdownexp = "021 - MALACCA";

  // Read current header user text
  const userheader = page.getByRole('button', { name: /Bharath/i });
  const headerText = await userheader.innerText();

  console.log("Current Header :", headerText);

  // await page.locator("xpath=//div[contains(@class,'userDiv')]//p[contains(.,'Bharath') and contains(.,'MCSO')]").textContent();

  // If already correct outlet → skip switch
  if (headerText?.includes(expectedUser)) {

    console.log("✅ Correct outlet already selected");

  } else {

    console.log("🔄 Switching User...");

    // Open dropdown
    await page.locator(".arrow").click();

    // Wait dropdown visible
    await page
      .locator(".sub-outlet-list.ng-star-inserted")
      .first()
      .waitFor({ state: "visible" });

    // Select outlet
    await page
      .locator(
        ".sub-outlet-list.ng-star-inserted",
        { hasText: dropdownexp }
      )
      .click();
    await page.waitForTimeout(2000);

    // Confirm switched
    await expect(
      page.getByText(expectedUser)
    ).toBeVisible({ timeout: 15000 });

    console.log("✅ User switched successfully");
  }
  // -------- NAVIGATION --------

  await page.waitForLoadState("networkidle");
  await page.locator(".mat-row").first().waitFor();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Service' }).click();
  await page.getByText("Service Setup", { exact: true }).click();
  await page.locator(".mat-focus-indicator:has-text('OP Code')").first().click();
  await page.locator(".mat-focus-indicator:has-text('OP Code')").nth(1).click();
  // -------- ADD OP CODE --------

  await page.getByRole("button",
    { name: "Add Op Code" }).click();

  await page.getByRole("textbox",
    { name: "Enter Op Code" })
    .fill("test012");

  await page.locator(".ng-arrow-wrapper")
    .nth(1).click();

  await page.getByRole("option",
    { name: "T - TOYOTA/LEXUS" }).click();

  await page.locator(".ng-value-container")
    .nth(3).click();

  await page.getByRole("option",
    { name: "ALL - Apply All" }).click();

  await page.getByRole("textbox",
    { name: "Enter Description 1" })
    .fill("test025");

  await page.getByRole("textbox",
    { name: "Enter Description 2" })
    .fill("desc2");

  await page.locator(".ng-value-container").nth(4).click();

  await page.getByRole("option",
    { name: "- Maintenance" }).click();

  await page.locator(".ng-value-container").nth(5).click();

  await page.getByRole("option",
    { name: "- Maintenance" }).click();

  await page.locator(".ng-value-container").nth(6).click();

  await page.getByRole("option",
    { name: "- Zero" }).click();

  await page.locator(".ng-value-container").nth(10).click();

  await page.getByText("- GENERAL REPAIR").click();

  await page.locator(".ng-value-container").nth(9).click();

  await page.getByRole("option", { name: "No" }).click();

  // Save (optional)
  // await page.getByRole('button',{name:'Save'}).click();

});