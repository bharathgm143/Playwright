const  base = require("@playwright/test");

exports.custometest= base.test.extend({
    testDataForOrder: {
        username: "bharathgm63@gmail.com",
        passwword: "Dms@123456",
        productName: "ZARA COAT 3"
    }

}


)