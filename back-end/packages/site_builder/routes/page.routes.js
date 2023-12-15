// routes/page.routes.js
const controller = require("../controllers/page.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/page", controller.createPage);
    app.get("/api/page", controller.getPages);
    app.get("/api/page/:id", controller.getPage);
    app.put("/api/page/:id", controller.updatePage);
    app.delete("/api/page/:id", controller.deletePage);
    // Add other routes as needed
};
