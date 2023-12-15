// routes/service.routes.js
const controller = require("../controllers/service.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/service", controller.createService);
    app.get("/api/service", controller.getServices);
    app.get("/api/service/:id", controller.getService);
    app.put("/api/service/:id", controller.updateService);
    app.delete("/api/service/:id", controller.deleteService);
    // Add other routes as needed
};
