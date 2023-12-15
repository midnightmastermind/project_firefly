/**
 * This code is a module that exports functions that allow for the creation, reading, and updating of questions.
 * The module requires the 'authJwt' middleware for authentication and the 'controller' module for the actual functions.
 */
const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/question.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/question/", controller.getQuestions);
  app.get("/api/question/:id", controller.getQuestion);
  app.post("/api/question", [authJwt.verifyToken], controller.createQuestion);
  app.put("/api/question/:id", [authJwt.verifyToken], controller.updateQuestion);

};