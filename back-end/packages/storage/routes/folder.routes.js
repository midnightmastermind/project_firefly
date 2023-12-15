/**
 * This code is the routes for the folder controller.
 * The first route is for getting all folder, the second is for getting folder for a specific user, the third is for getting folder for a specific superUser, the fourth is for getting folder for a specific admin, and the fifth is for getting folder for a specific media
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/folder.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/folder/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getFolders);
    app.post("/api/folder/by-id/", controller.getFolderById);
    app.post("/api/folder", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createFolder);
    app.put("/api/folder/:id", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.updateFolder);
};