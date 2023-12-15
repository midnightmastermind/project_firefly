/**
 * This code is a module that exports functions that allow for the creation, reading, and updating of forms.
 * The module requires the 'authJwt' middleware for authentication and the 'controller' module for the actual functions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/form.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/form/", controller.getForms);
  app.get("/api/form/:id", controller.getForm);
  app.post("/api/form", [authJwt.verifyToken], controller.createForm);
  app.put("/api/form/:id", [authJwt.verifyToken], controller.updateForm);

};