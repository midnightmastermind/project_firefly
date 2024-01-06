// routes/charitable_cause.routes.js
const controller = require("../controllers/charitable_cause.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/charitable_cause", controller.createCharitableCause);
    app.get("/api/charitable_cause", controller.getCharitableCauses);
    app.get("/api/charitable_cause/:id", controller.getCharitableCause);
    app.put("/api/charitable_cause/:id", controller.updateCharitableCause);
    app.delete("/api/charitable_cause/:id", controller.deleteCharitableCause);
    // Add other routes as needed
};
