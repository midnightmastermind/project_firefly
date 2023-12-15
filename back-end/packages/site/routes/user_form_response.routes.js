/**
 * This code is a module that exports functions that allow for the creation, reading, and updating of user_form_responses.
 * The module requires the 'authJwt' middleware for authentication and the 'controller' module for the actual functions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/user_form_response.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user_form_response/", controller.getUserFormResponses);
  app.get("/api/user_form_response/:id", controller.getUserFormResponse);
  app.post("/api/user_form_response", [authJwt.verifyToken], controller.createUserFormResponse);
  app.put("/api/user_form_response/:id", [authJwt.verifyToken], controller.updateUserFormResponse);

};