/**
 * This code is the routes for the products.
 * The first route is for getting all the products, the second route is for getting products for the site, the third route is for creating a product, and the fourth route is for updating a product.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/product/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getProducts);
    app.get("/api/product/for-site", controller.getProductsForSite);
    app.post("/api/product/", [authJwt.verifyToken, authJwt.isSuperUser], controller.createProduct);
    app.put("/api/product/:id", [authJwt.verifyToken, authJwt.isSuperUser], controller.updateProduct);


}