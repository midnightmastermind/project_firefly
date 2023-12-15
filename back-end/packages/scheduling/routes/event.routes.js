// routes/event.routes.js
const controller = require("../controllers/event.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/event", controller.createEvent);
    app.get("/api/event", controller.getEvents);
    app.get("/api/event/:id", controller.getEvent);
    app.put("/api/event/:id", controller.updateEvent);
    app.delete("/api/event/:id", controller.deleteEvent);
    // Add other routes as needed
};
