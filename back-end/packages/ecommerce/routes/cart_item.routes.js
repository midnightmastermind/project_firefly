// routes/cart_item.routes.js
const controller = require("../controllers/cart_item.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/cart_item", controller.createCartItem);
    app.get("/api/cart_item", controller.getCartItems);
    app.get("/api/cart_item/:id", controller.getCartItem);
    app.put("/api/cart_item/:id", controller.updateCartItem);
    app.delete("/api/cart_item/:id", controller.deleteCartItem);
    // Add other routes as needed
};
