// controllers/donation.controller.js
const db = require("../../../models");
const Donation = db.donation;

// Create a new Donation
exports.createDonation = (req, res) => {
  const donation = new Donation({
    title: req.body.title,
    content: req.body.content,
    // Add other fields as needed
  });

  donation.save((err, donation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(donation);
  });
};

// Get all Donations
exports.getDonations = (req, res) => {
  Donation.find()
    .exec((err, donations) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!donations) {
        return res.status(404).send({ message: "Donations not found." });
      }

      res.status(200).send(donations);
    });
};

// Get a specific Donation by ID
exports.getDonation = (req, res) => {
  Donation.findById(req.params.id)
    .exec((err, donation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!donation) {
        return res.status(404).send({ message: "Donation not found." });
      }

      res.status(200).send(donation);
    });
};

// Update a Donation by ID
exports.updateDonation = (req, res) => {
  const donationUpdates = {
    ...req.body
  };

  Donation.findOneAndUpdate({ _id: req.params.id }, donationUpdates, { new: true })
    .exec((err, donation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!donation) {
        return res.status(404).send({ message: "Donation not found." });
      }

      res.status(200).send(donation);
    });
};

// Delete a Donation by ID
exports.deleteDonation = (req, res) => {
  Donation.findOneAndDelete({ _id: req.params.id })
    .exec((err, donation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!donation) {
        return res.status(404).send({ message: "Donation not found." });
      }

      res.status(200).send(donation);
    });
};
