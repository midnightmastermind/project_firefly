// routes/post_category.routes.js
const controller = require("../controllers/post_category.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/post_category", controller.createPostCategory);
    app.get("/api/post_category", controller.getPostCategorys);
    app.get("/api/post_category/:id", controller.getPostCategory);
    app.put("/api/post_category/:id", controller.updatePostCategory);
    app.delete("/api/post_category/:id", controller.deletePostCategory);
    // Add other routes as needed
};
