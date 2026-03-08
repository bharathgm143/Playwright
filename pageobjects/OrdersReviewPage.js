const { expect } = require("@playwright/test");
class OrdersReviewPage {

    constructor(page) {
        this.page = page;
        this.country = page.getByPlaceholder("Select Country");
        this.Dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.country.pressSequentially(countryCode, { delay: 150 });
        await this.Dropdown.waitFor();
        const Optionscount = await this.Dropdown.locator("button").count();
        for (let i = 0; i < Optionscount; ++i) {
            const text = await this.Dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.Dropdown.locator('button').nth(i).click();
                break;
            }
        }
    }
    async VerifyEmailId(email) {
        await expect(this.emailId).toHaveText(email);
    }
    async SubmitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}
module.exports={OrdersReviewPage}