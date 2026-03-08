class DashboardPage {


    constructor(page) {
        this.page = page;
        this.Products = page.locator(".card-body");
        this.ProductsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*=cart]");
        this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(Prodname){
        const alltitlecards = await this.ProductsText.allTextContents();
          console.log(alltitlecards);
        
          const count = await this.Products.count();
          for (let i = 0; i < count; ++i) {
            if (await this.Products.nth(i).locator("b").textContent() === Prodname) {
              await this.Products.nth(i).locator("text= Add To Cart").click();
              break;
            }
          }
    }
    async navigatetoorders(){
      await this.orders.click();
    }

    async navigatetocart(){

    await this.cart.click();

    }

}
module.exports={DashboardPage};