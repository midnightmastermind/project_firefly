// routes/shipment.routes.js
const controller = require("../controllers/shipment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/shipment", controller.createShipment);
    app.get("/api/shipment", controller.getShipments);
    app.get("/api/shipment/:id", controller.getShipment);
    app.put("/api/shipment/:id", controller.updateShipment);
    app.delete("/api/shipment/:id", controller.deleteShipment);
    // Add other routes as needed
};
