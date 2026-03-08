const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardpage=new DashboardPage(this.page);
        this.cartpage=new CartPage(this.page);
        this.ordersreviewpage=new OrdersReviewPage(this.page);
        this.ordershistorypage=new OrdersHistoryPage(this.page);
    }

getLoginPage(){
    return this.loginPage;
}
getDashboardPage(){
    return this.dashboardpage;
}
getCartPage(){
    return this.cartpage;
}
getOrdersReviewPage(){
    return this.ordersreviewpage;
}
getOrdersHistoryPage(){
    return this.ordershistorypage;
}
}
module.exports={POManager};
