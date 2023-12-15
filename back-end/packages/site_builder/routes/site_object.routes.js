/**
 * This code is the routes for the site_object controller.
 * The first route is for getting all site_object, the second is for getting site_object for a specific user, the third is for getting site_object for a specific superUser, the fourth is for getting site_object for a specific admin, and the fifth is for getting site_object for a specific site
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/site_object.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/site_object/", controller.getSiteObjects);
    app.post("/api/site_object/by-id/", controller.getSiteObjectById);
    app.post("/api/site_object", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createSiteObject);
    app.put("/api/site_object/:id", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.updateSiteObject);
};