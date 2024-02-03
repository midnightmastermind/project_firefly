// routes/post.routes.js
const controller = require("../controllers/post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/post", controller.createPost);
    app.get("/api/post", controller.getPosts);
    app.get("/api/post/:id", controller.getPostById);
    app.put("/api/post/:id", controller.updatePost);
    app.delete("/api/post/:id", controller.deletePost);
    // Add other routes as needed
};
