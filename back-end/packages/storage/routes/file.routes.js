/**
 * This code is the routes for the file controller.
 * The first route is for getting all file, the second is for getting file for a specific user, the third is for getting file for a specific superUser, the fourth is for getting file for a specific admin, and the fifth is for getting file for a specific media
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/file.controller");
const processFileMiddleware = require("../middlewares/upload");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/file/", [authJwt.verifyToken, authJwt.isSuperUser], controller.getFiles);
    app.get("/api/file/by-id/", controller.getFileById);
    app.post("/api/file", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.createFile);
    app.put("/api/file/:id", [authJwt.verifyToken, authJwt.isGlobalAdmin], controller.updateFile);
    app.get('/api/file/progress/:id', controller.getUploadProgress);
    app.post('/api/file/upload', processFileMiddleware, controller.uploadFile);
};