// routes/style.routes.js
const controller = require("../controllers/style.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/style", controller.createStyle);
    app.get("/api/style", controller.getStyles);
    app.get("/api/style/:id", controller.getStyle);
    app.put("/api/style/:id", controller.updateStyle);
    app.delete("/api/style/:id", controller.deleteStyle);
    // Add other routes as needed
};
