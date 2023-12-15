// controllers/variation.controller.js
const db = require("../../../models");
const Variation = db.variation;

// Create a new Variation
exports.createVariation = (req, res) => {
  const variation = new Variation({
    ...req.body
    // Add other fields as needed
  });

  variation.save((err, variation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(variation);
  });
};

// Get all Variations
exports.getVariations = (req, res) => {
  Variation.find()
    .exec((err, variations) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!variations) {
        return res.status(404).send({ message: "Variations not found." });
      }

      res.status(200).send(variations);
    });
};

// Get a specific Variation by ID
exports.getVariation = (req, res) => {
  Variation.findById(req.params.id)
    .exec((err, variation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!variation) {
        return res.status(404).send({ message: "Variation not found." });
      }

      res.status(200).send(variation);
    });
};

// Update a Variation by ID
exports.updateVariation = (req, res) => {
  const variationUpdates = {
    ...req.body
  };

  Variation.findOneAndUpdate({ _id: req.params.id }, variationUpdates, { new: true })
    .exec((err, variation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!variation) {
        return res.status(404).send({ message: "Variation not found." });
      }

      res.status(200).send(variation);
    });
};

// Delete a Variation by ID
exports.deleteVariation = (req, res) => {
  Variation.findOneAndDelete({ _id: req.params.id })
    .exec((err, variation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!variation) {
        return res.status(404).send({ message: "Variation not found." });
      }

      res.status(200).send(variation);
    });
};
