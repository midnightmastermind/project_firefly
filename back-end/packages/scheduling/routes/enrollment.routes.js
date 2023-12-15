/**
 * This code is the routes for the enrollment controller.
 * The first two routes are for getting enrollments, one for all enrollments and one for enrollments for a specific site.
 * The next route is for creating an enrollment.
 * The last route is for updating an enrollment.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/enrollment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/enrollment/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getEnrollments);
  app.get("/api/enrollment/for-site", [authJwt.verifyToken, authJwt.isSuperUser], controller.getEnrollmentsForSite);
  app.get("/api/enrollment/for-user", [authJwt.verifyToken], controller.getEnrollmentsForUser);
  app.post("/api/enrollment", [authJwt.verifyToken], controller.createEnrollment);
  app.put("/api/enrollment/:id", [authJwt.verifyToken], controller.updateEnrollment);

};