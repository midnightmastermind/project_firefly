/**
 * This code is the product permissions routes.
 * There are different routes for getting product permissions depending on whether the user is a superUser or not, and for creating and updating product permissions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/product_permissions.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product_permissions/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getProductPermissions);
  app.get("/api/product_permissions/for-site", [authJwt.verifyToken, authJwt.isSuperUser], controller.getProductPermissionsForSite);
  app.get("/api/product_permissions/for-user", [authJwt.verifyToken], controller.getProductPermissionsForUser);
  app.post("/api/product_permissions", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.createProductPermissions);
  app.put("/api/product_permissions/:id", [authJwt.verifyToken], controller.updateProductPermissions);

};