// routes/donation.routes.js
const controller = require("../controllers/donation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/donation", controller.createDonation);
    app.get("/api/donation", controller.getDonations);
    app.get("/api/donation/:id", controller.getDonation);
    app.put("/api/donation/:id", controller.updateDonation);
    app.delete("/api/donation/:id", controller.deleteDonation);
    // Add other routes as needed
};
