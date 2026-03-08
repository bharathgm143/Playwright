
import { test, expect } from "@playwright/test";

test ("Calendertest", async({page})=>{
    page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const calmonth="11";
    const caldate="14";
    const calyear="2030";
    const expectedList=[calmonth,caldate,calyear];

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    const targetYear =Number(calyear);

    while (true) {
    const displayedYear = await page.locator(".react-calendar__decade-view__years__year").allTextContents();
  console.log(displayedYear);
 
  if (displayedYear?.includes(calyear)){
    break;
  }
  const firstYear = Number(await page.locator(".react-calendar__decade-view__years__year").first().textContent());
  
  if (targetYear > firstYear) {
    await page.locator(".react-calendar__navigation__next-button").click();
  } else {
    await page.locator(".react-calendar__navigation__prev-button").click();
   }
}
    await page.locator(".react-calendar__decade-view__years__year").getByText(calyear, { exact: true }).click();
    await page.locator(".react-calendar__year-view__months button").nth(Number(calmonth)-1).click();
    await page.locator("//abbr[text()='"+caldate+"']").click();

    const inputs= page.locator('.react-date-picker__inputGroup__input');

    for (let i=0; i<expectedList.length; i++){
        const values=await inputs.nth(i).inputValue();
        expect(values).toEqual(expectedList[i]);
        
    }
 
});

