// controllers/navigation.controller.js
const db = require("../../../models");
const Navigation = db.navigation;

// Create a new Navigation
exports.createNavigation = (req, res) => {
  const navigation = new Navigation({
    ...req.body
    // Add other fields as needed
  });

  navigation.save((err, navigation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(navigation);
  });
};

// Get all Navigations
exports.getNavigations = (req, res) => {
  Navigation.find()
    .exec((err, navigations) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!navigations) {
        return res.status(404).send({ message: "Navigations not found." });
      }

      res.status(200).send(navigations);
    });
};

// Get a specific Navigation by ID
exports.getNavigation = (req, res) => {
  Navigation.findById(req.params.id)
    .exec((err, navigation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!navigation) {
        return res.status(404).send({ message: "Navigation not found." });
      }

      res.status(200).send(navigation);
    });
};

// Update a Navigation by ID
exports.updateNavigation = (req, res) => {
  const navigationUpdates = {
    ...req.body
  };

  Navigation.findOneAndUpdate({ _id: req.params.id }, navigationUpdates, { new: true })
    .exec((err, navigation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!navigation) {
        return res.status(404).send({ message: "Navigation not found." });
      }

      res.status(200).send(navigation);
    });
};

// Delete a Navigation by ID
exports.deleteNavigation = (req, res) => {
  Navigation.findOneAndDelete({ _id: req.params.id })
    .exec((err, navigation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!navigation) {
        return res.status(404).send({ message: "Navigation not found." });
      }

      res.status(200).send(navigation);
    });
};
