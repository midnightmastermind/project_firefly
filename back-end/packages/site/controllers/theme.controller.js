// controllers/theme.controller.js
const db = require("../../../models");
const Theme = db.theme;

// Create a new Theme
exports.createTheme = (req, res) => {
  const theme = new Theme({
    ...req.body
    // Add other fields as needed
  });

  theme.save((err, theme) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(theme);
  });
};

// Get all Themes
exports.getThemes = (req, res) => {
  Theme.find()
    .exec((err, themes) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!themes) {
        return res.status(404).send({ message: "Themes not found." });
      }

      res.status(200).send(themes);
    });
};

// Get a specific Theme by ID
exports.getTheme = (req, res) => {
  Theme.findById(req.params.id)
    .exec((err, theme) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!theme) {
        return res.status(404).send({ message: "Theme not found." });
      }

      res.status(200).send(theme);
    });
};

// Update a Theme by ID
exports.updateTheme = (req, res) => {
  const themeUpdates = {
    ...req.body
  };

  Theme.findOneAndUpdate({ _id: req.params.id }, themeUpdates, { new: true })
    .exec((err, theme) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!theme) {
        return res.status(404).send({ message: "Theme not found." });
      }

      res.status(200).send(theme);
    });
};

// Delete a Theme by ID
exports.deleteTheme = (req, res) => {
  Theme.findOneAndDelete({ _id: req.params.id })
    .exec((err, theme) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!theme) {
        return res.status(404).send({ message: "Theme not found." });
      }

      res.status(200).send(theme);
    });
};
