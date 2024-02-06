// routes/stripeRoutes.js

const { authJwt } = require("../../../middlewares");
const stripeController = require("../controllers/stripe.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a payment intent
    app.post("/api/stripe/create-payment-intent", [authJwt.verifyToken], stripeController.createPaymentIntent);
};
