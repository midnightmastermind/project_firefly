// controllers/style.controller.js
const db = require("../../../models");
const Style = db.style;

// Create a new Style
exports.createStyle = (req, res) => {
  const style = new Style({
    ...req.body
    // Add other fields as needed
  });

  style.save((err, style) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(style);
  });
};

// Get all Styles
exports.getStyles = (req, res) => {
  Style.find()
    .exec((err, styles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!styles) {
        return res.status(404).send({ message: "Styles not found." });
      }

      res.status(200).send(styles);
    });
};

// Get a specific Style by ID
exports.getStyle = (req, res) => {
  Style.findById(req.params.id)
    .exec((err, style) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!style) {
        return res.status(404).send({ message: "Style not found." });
      }

      res.status(200).send(style);
    });
};

// Update a Style by ID
exports.updateStyle = (req, res) => {
  const styleUpdates = {
    ...req.body
  };

  Style.findOneAndUpdate({ _id: req.params.id }, styleUpdates, { new: true })
    .exec((err, style) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!style) {
        return res.status(404).send({ message: "Style not found." });
      }

      res.status(200).send(style);
    });
};

// Delete a Style by ID
exports.deleteStyle = (req, res) => {
  Style.findOneAndDelete({ _id: req.params.id })
    .exec((err, style) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!style) {
        return res.status(404).send({ message: "Style not found." });
      }

      res.status(200).send(style);
    });
};
