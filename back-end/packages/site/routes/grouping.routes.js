/**
 * This code is a module that exports functions that allow for the creation, reading, and updating of groupings.
 * The module requires the 'authJwt' middleware for authentication and the 'controller' module for the actual functions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/grouping.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/grouping/", controller.getGroupings);
  app.get("/api/grouping/:id", controller.getGrouping);
  app.post("/api/grouping", [authJwt.verifyToken], controller.createGrouping);
  app.put("/api/grouping/:id", [authJwt.verifyToken], controller.updateGrouping);

};