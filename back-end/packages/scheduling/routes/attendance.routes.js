/**
 * This code is the routes for the attendance controller.
 * The routes are:

GET /api/attendance
GET /api/attendance/:id
POST /api/attendance
PUT /api/attendance/:id
 */

const { authJwt } = require("../../../middlewares");
const controller = require("../controllers/attendance.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/attendance/", controller.getAttendances);
  app.get("/api/attendance/:id", controller.getAttendance);
  app.post("/api/attendance", [authJwt.verifyToken], controller.createAttendance);
  app.put("/api/attendance/:id", [authJwt.verifyToken], controller.updateAttendance);

};