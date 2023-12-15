// routes/theme.routes.js
const controller = require("../controllers/theme.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/theme", controller.createTheme);
    app.get("/api/theme", controller.getThemes);
    app.get("/api/theme/:id", controller.getTheme);
    app.put("/api/theme/:id", controller.updateTheme);
    app.delete("/api/theme/:id", controller.deleteTheme);
    // Add other routes as needed
};
