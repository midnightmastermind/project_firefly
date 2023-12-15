/**
 * This code is the routes for the site permissions controller.
 * The first two routes are for getting all site permissions or getting site permissions by user.
 * The last two routes are for creating or updating a site permission.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/site_permissions.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    app.get("/api/site_permissions/", controller.getSitePermissions);
    app.get("/api/site_permissions/by-user/:user_id", controller.getSitePermissionsByUser);
    app.post("/api/site_permissions", [authJwt.verifyToken], controller.createSitePermissions);
    app.put("/api/site_permissions/:id", [authJwt.verifyToken], controller.updateSitePermissions);

};