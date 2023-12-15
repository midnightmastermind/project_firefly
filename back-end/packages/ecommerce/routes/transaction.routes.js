// routes/transaction.routes.js
const controller = require("../controllers/transaction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/transaction", controller.createTransaction);
  app.get("/api/transaction", controller.getTransactions);
  app.get("/api/transaction/:id", controller.getTransaction);
  app.put("/api/transaction/:id", controller.updateTransaction);
  app.delete("/api/transaction/:id", controller.deleteTransaction);
  // Add other routes as needed
};
