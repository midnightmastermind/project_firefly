/**
 * This code is the routes for the auth controller.
 * The first route is for signing up, and the second is for signing in.
 */
const { verifySignUp } = require("../../../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/oauth-signup", controller.oAuthSignup);

  app.post("/api/auth/oauth-signin", controller.oAuthSignin);

  app.post("/api/auth/create-google-auth-link", controller.createLink);

  app.get("/api/auth/handle-google-redirect", controller.handleGoogleRedirect);

  app.post("/api/auth/get-valid-token", controller.getValidToken);

  app.post("/api/auth/create-microsoft-auth-link", controller.createMicrosoftLink);

  app.get("/api/auth/handle-microsoft-redirect", controller.handleMicrosoftRedirect);

  app.post("/api/auth/get-valid-microsoft-token", controller.getValidMicrosoftToken);


};
