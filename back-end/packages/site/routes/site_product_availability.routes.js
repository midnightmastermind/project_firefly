/**
 * This code is the site_product_availability route.
 * It contains the different HTTP methods that can be used for the site_product_availability route and what middleware is required for each method.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/site_product_availability.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/site_product_availability/", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.getSiteProductAvailabilities);
//   app.get("/api/site_product_availability/:id", controller.getSiteProductAvailability);
  app.post("/api/site_product_availability", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.createSiteProductAvailability);
  app.delete("/api/site_product_availability/:id", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.deleteSiteProductAvailability);
  app.put("/api/site_product_availability/:id", [authJwt.verifyToken], controller.updateSiteProductAvailability);

};