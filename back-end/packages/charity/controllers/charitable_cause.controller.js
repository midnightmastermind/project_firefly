// controllers/charitable_cause.controller.js
const db = require("../../../models");
const CharitableCause = db.charitable_cause;

// Create a new CharitableCause
exports.createCharitableCause = (req, res) => {
  const charitable_cause = new CharitableCause({
    title: req.body.title,
    content: req.body.content,
    // Add other fields as needed
  });

  charitable_cause.save((err, charitable_cause) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(charitable_cause);
  });
};

// Get all CharitableCauses
exports.getCharitableCauses = (req, res) => {
  CharitableCause.find()
    .exec((err, charitable_causes) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!charitable_causes) {
        return res.status(404).send({ message: "CharitableCauses not found." });
      }

      res.status(200).send(charitable_causes);
    });
};

// Get a specific CharitableCause by ID
exports.getCharitableCause = (req, res) => {
  CharitableCause.findById(req.params.id)
    .exec((err, charitable_cause) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!charitable_cause) {
        return res.status(404).send({ message: "CharitableCause not found." });
      }

      res.status(200).send(charitable_cause);
    });
};

// Update a CharitableCause by ID
exports.updateCharitableCause = (req, res) => {
  const charitable_causeUpdates = {
    ...req.body
  };

  CharitableCause.findOneAndUpdate({ _id: req.params.id }, charitable_causeUpdates, { new: true })
    .exec((err, charitable_cause) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!charitable_cause) {
        return res.status(404).send({ message: "CharitableCause not found." });
      }

      res.status(200).send(charitable_cause);
    });
};

// Delete a CharitableCause by ID
exports.deleteCharitableCause = (req, res) => {
  CharitableCause.findOneAndDelete({ _id: req.params.id })
    .exec((err, charitable_cause) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!charitable_cause) {
        return res.status(404).send({ message: "CharitableCause not found." });
      }

      res.status(200).send(charitable_cause);
    });
};
