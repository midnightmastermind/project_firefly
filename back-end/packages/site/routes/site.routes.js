/**
 * This code is the site routes.
 * The first route is for getting all sites, the second is for getting a site by name, the third is for getting a site by id, the fourth is for creating a new site, and the fifth is for updating an existing site.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/site.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/site/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getSites);
  app.post("/api/site/by-name/", controller.getSiteByName);
  app.get("/api/site/:id", controller.getSite);
  app.post("/api/site", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createSite);
  app.put("/api/site/:id", [authJwt.verifyToken], controller.updateSite);
  app.delete("/api/site/:id",  [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.deleteSite);
};

