// routes/variation.routes.js
const controller = require("../controllers/variation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/variation", controller.createVariation);
    app.get("/api/variation", controller.getVariations);
    app.get("/api/variation/:id", controller.getVariation);
    app.put("/api/variation/:id", controller.updateVariation);
    app.delete("/api/variation/:id", controller.deleteVariation);
    // Add other routes as needed
};
