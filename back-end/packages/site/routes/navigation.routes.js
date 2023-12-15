// routes/navigation.routes.js
const controller = require("../controllers/navigation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/navigation", controller.createNavigation);
    app.get("/api/navigation", controller.getNavigations);
    app.get("/api/navigation/:id", controller.getNavigation);
    app.put("/api/navigation/:id", controller.updateNavigation);
    app.delete("/api/navigation/:id", controller.deleteNavigation);
    // Add other routes as needed
};
