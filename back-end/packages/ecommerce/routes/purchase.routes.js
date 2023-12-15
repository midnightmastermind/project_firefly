// routes/purchase.routes.js
const controller = require("../controllers/purchase.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/purchase", controller.createPurchase);
    app.get("/api/purchase", controller.getPurchases);
    app.get("/api/purchase/:id", controller.getPurchase);
    app.put("/api/purchase/:id", controller.updatePurchase);
    app.delete("/api/purchase/:id", controller.deletePurchase);
    // Add other routes as needed
};
