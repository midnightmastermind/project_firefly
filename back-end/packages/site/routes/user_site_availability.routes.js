/**
 * This code is the routes for the user site availability controller.
 * The routes are:

GET /api/user_site_availability/
POST /api/user_site_availability
PUT /api/user_site_availability/:id
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/user_site_availability.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user_site_availability/", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.getUserSiteAvailabilities);
  app.post("/api/user_site_availability", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.createUserSiteAvailability);
  app.put("/api/user_site_availability/:id", [authJwt.verifyToken], controller.updateUserSiteAvailability);

};