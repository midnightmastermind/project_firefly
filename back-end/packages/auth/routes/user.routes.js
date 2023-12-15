/**
 * This code is the routes for the user controller.
 * The first route is for getting all users, the second is for getting all superUsers, the third is for getting all users for the site, the fourth is for getting a specific user by id, and the fifth is for updating a specific user by id.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user", [authJwt.verifyToken, authJwt.isSuperUser], controller.getUsers);
    app.get("/api/user/superUsers", controller.getSuperUsers);
    app.get("/api/user/for-site", [authJwt.verifyToken, authJwt.isSuperUser], controller.getUsersForSite);
    app.get("/api/user/:id", [authJwt.verifyToken], controller.getUser);
    app.post("/api/user", [authJwt.verifyToken, authJwt.isSiteAdmin], controller.createUser);
    app.put("/api/user/:id", [authJwt.verifyToken], controller.updateUser);
};
