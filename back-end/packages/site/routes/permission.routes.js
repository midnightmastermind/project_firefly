// routes/permission.routes.js
const controller = require("../controllers/permission.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/permission", controller.createPermission);
    app.get("/api/permission", controller.getPermissions);
    app.get("/api/permission/:id", controller.getPermission);
    app.put("/api/permission/:id", controller.updatePermission);
    app.delete("/api/permission/:id", controller.deletePermission);
    // Add other routes as needed
};
