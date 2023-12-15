/**
 * This code is a module that exports functions that allow for the creation, reading, and updating of sessions.
 * The module requires the 'authJwt' middleware for authentication and the 'controller' module for the actual functions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/session.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/session/", controller.getSessions);
  app.get("/api/session/:id", controller.getSession);
  app.post("/api/session", [authJwt.verifyToken], controller.createSession);
  app.put("/api/session/:id", [authJwt.verifyToken], controller.updateSession);

};