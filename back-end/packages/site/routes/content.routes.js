/**
 * This code is the routes for the content controller.
 * The first route is for getting all content, the second is for getting content for a specific user, the third is for getting content for a specific superUser, the fourth is for getting content for a specific admin, and the fifth is for getting content for a specific site
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/content.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/content/all", controller.allAccess);

    app.get("/api/content/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/content/superUser",
        [authJwt.verifyToken, authJwt.isSuperUser],
        controller.superUserBoard
    );

    app.get(
        "/api/content/admin",
        [authJwt.verifyToken, authJwt.isSiteAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/content/global_admin",
        [authJwt.verifyToken, authJwt.isGlobalAdmin],
        controller.globalAdminBoard
    );


    app.get("/api/content/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getContent);
    app.post("/api/content/by-site/", controller.getContentBySite);
    app.post("/api/content", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createContent);
    app.put("/api/content/:id", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.updateContent);
};