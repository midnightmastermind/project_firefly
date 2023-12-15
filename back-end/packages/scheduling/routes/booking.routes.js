// routes/booking.routes.js
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/booking", controller.createBooking);
    app.get("/api/booking", controller.getBookings);
    app.get("/api/booking/:id", controller.getBooking);
    app.put("/api/booking/:id", controller.updateBooking);
    app.delete("/api/booking/:id", controller.deleteBooking);
    // Add other routes as needed
};
