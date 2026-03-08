const {expect } = require('@playwright/test');
class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");


    }

    async VerifyProductIsDisplayed(Prodname) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(Prodname).isVisible();
        expect(bool).toBeTruthy();

    }
    async Checkout() {
        await this.checkout.click();
    }
    getProductLocator(Prodname) {
        return this.page.locator("h3:has-text('" + Prodname + "')");
    }
}
module.exports = { CartPage };