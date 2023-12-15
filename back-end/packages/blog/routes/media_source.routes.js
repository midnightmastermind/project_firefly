/**
 * This code is the routes for the video_source controller.
 * The first route is for getting all video_source, the second is for getting video_source for a specific user, the third is for getting video_source for a specific superUser, the fourth is for getting video_source for a specific admin, and the fifth is for getting video_source for a specific site
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/media_source.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/video_source/", controller.getVideo_Sources);
    app.post("/api/video_source/by-id/", controller.getVideo_SourceById);
    app.post("/api/video_source", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createVideo_Source);
    app.put("/api/video_source/:id", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.updateVideo_Source);
};