// controllers/commerce_category.controller.js
const db = require("../../../models");
const CommerceCategory = db.commerce_category;

// Create a new CommerceCategory
exports.createCommerceCategory = (req, res) => {
  const commerce_category = new CommerceCategory({
    ...req.body
    // Add other fields as needed
  });

  commerce_category.save((err, commerce_category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(commerce_category);
  });
};

// Get all CommerceCategories
exports.getCommerceCategories = (req, res) => {
  CommerceCategory.find()
    .exec((err, commerce_categorys) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!commerce_categorys) {
        return res.status(404).send({ message: "CommerceCategories not found." });
      }

      res.status(200).send(commerce_categorys);
    });
};

// Get a specific CommerceCategory by ID
exports.getCommerceCategory = (req, res) => {
  CommerceCategory.findById(req.params.id)
    .exec((err, commerce_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!commerce_category) {
        return res.status(404).send({ message: "CommerceCategory not found." });
      }

      res.status(200).send(commerce_category);
    });
};

// Update a CommerceCategory by ID
exports.updateCommerceCategory = (req, res) => {
  const commerce_categoryUpdates = {
    ...req.body
  };

  CommerceCategory.findOneAndUpdate({ _id: req.params.id }, commerce_categoryUpdates, { new: true })
    .exec((err, commerce_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!commerce_category) {
        return res.status(404).send({ message: "CommerceCategory not found." });
      }

      res.status(200).send(commerce_category);
    });
};

// Delete a CommerceCategory by ID
exports.deleteCommerceCategory = (req, res) => {
  CommerceCategory.findOneAndDelete({ _id: req.params.id })
    .exec((err, commerce_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!commerce_category) {
        return res.status(404).send({ message: "CommerceCategory not found." });
      }

      res.status(200).send(commerce_category);
    });
};
