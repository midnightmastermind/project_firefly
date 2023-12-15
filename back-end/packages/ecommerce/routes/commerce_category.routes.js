// routes/commerce_category.routes.js
const controller = require("../controllers/commerce_category.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/commerce_category", controller.createCommerceCategory);
    app.get("/api/commerce_category", controller.getCommerceCategorys);
    app.get("/api/commerce_category/:id", controller.getCommerceCategory);
    app.put("/api/commerce_category/:id", controller.updateCommerceCategory);
    app.delete("/api/commerce_category/:id", controller.deleteCommerceCategory);
    // Add other routes as needed
};
