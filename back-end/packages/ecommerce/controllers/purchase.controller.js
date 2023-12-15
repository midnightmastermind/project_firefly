// controllers/purchase.controller.js
const db = require("../../../models");
const Purchase = db.purchase;

// Create a new Purchase
exports.createPurchase = (req, res) => {
  const purchase = new Purchase({
    ...req.body
    // Add other fields as needed
  });

  purchase.save((err, purchase) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(purchase);
  });
};

// Get all Purchases
exports.getPurchases = (req, res) => {
  Purchase.find()
    .exec((err, purchases) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!purchases) {
        return res.status(404).send({ message: "Purchases not found." });
      }

      res.status(200).send(purchases);
    });
};

// Get a specific Purchase by ID
exports.getPurchase = (req, res) => {
  Purchase.findById(req.params.id)
    .exec((err, purchase) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!purchase) {
        return res.status(404).send({ message: "Purchase not found." });
      }

      res.status(200).send(purchase);
    });
};

// Update a Purchase by ID
exports.updatePurchase = (req, res) => {
  const purchaseUpdates = {
    ...req.body
  };

  Purchase.findOneAndUpdate({ _id: req.params.id }, purchaseUpdates, { new: true })
    .exec((err, purchase) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!purchase) {
        return res.status(404).send({ message: "Purchase not found." });
      }

      res.status(200).send(purchase);
    });
};

// Delete a Purchase by ID
exports.deletePurchase = (req, res) => {
  Purchase.findOneAndDelete({ _id: req.params.id })
    .exec((err, purchase) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!purchase) {
        return res.status(404).send({ message: "Purchase not found." });
      }

      res.status(200).send(purchase);
    });
};
