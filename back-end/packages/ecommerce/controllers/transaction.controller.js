// controllers/transaction.controller.js
const db = require("../../../models");
const Transaction = db.transaction;

// Create a new Transaction
exports.createTransaction = (req, res) => {
  const transaction = new Transaction({
    ...req.body
    // Add other fields as needed
  });

  transaction.save((err, transaction) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(transaction);
  });
};

// Get all Transactions
exports.getTransactions = (req, res) => {
  Transaction.find()
    .exec((err, transactions) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transactions) {
        return res.status(404).send({ message: "Transactions not found." });
      }

      res.status(200).send(transactions);
    });
};

// Get a specific Transaction by ID
exports.getTransaction = (req, res) => {
  Transaction.findById(req.params.id)
    .exec((err, transaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transaction) {
        return res.status(404).send({ message: "Transaction not found." });
      }

      res.status(200).send(transaction);
    });
};

// Update a Transaction by ID
exports.updateTransaction = (req, res) => {
  const transactionUpdates = {
    ...req.body
  };

  Transaction.findOneAndUpdate({ _id: req.params.id }, transactionUpdates, { new: true })
    .exec((err, transaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transaction) {
        return res.status(404).send({ message: "Transaction not found." });
      }

      res.status(200).send(transaction);
    });
};

// Delete a Transaction by ID
exports.deleteTransaction = (req, res) => {
  Transaction.findOneAndDelete({ _id: req.params.id })
    .exec((err, transaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transaction) {
        return res.status(404).send({ message: "Transaction not found." });
      }

      res.status(200).send(transaction);
    });
};
