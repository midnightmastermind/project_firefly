// controllers/shipment.controller.js
const db = require("../../../models");
const Shipment = db.shipment;

// Create a new Shipment
exports.createShipment = (req, res) => {
  const shipment = new Shipment({
    ...req.body
    // Add other fields as needed
  });

  shipment.save((err, shipment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(shipment);
  });
};

// Get all Shipments
exports.getShipments = (req, res) => {
  Shipment.find()
    .exec((err, shipments) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!shipments) {
        return res.status(404).send({ message: "Shipments not found." });
      }

      res.status(200).send(shipments);
    });
};

// Get a specific Shipment by ID
exports.getShipment = (req, res) => {
  Shipment.findById(req.params.id)
    .exec((err, shipment) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!shipment) {
        return res.status(404).send({ message: "Shipment not found." });
      }

      res.status(200).send(shipment);
    });
};

// Update a Shipment by ID
exports.updateShipment = (req, res) => {
  const shipmentUpdates = {
    ...req.body
  };

  Shipment.findOneAndUpdate({ _id: req.params.id }, shipmentUpdates, { new: true })
    .exec((err, shipment) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!shipment) {
        return res.status(404).send({ message: "Shipment not found." });
      }

      res.status(200).send(shipment);
    });
};

// Delete a Shipment by ID
exports.deleteShipment = (req, res) => {
  Shipment.findOneAndDelete({ _id: req.params.id })
    .exec((err, shipment) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!shipment) {
        return res.status(404).send({ message: "Shipment not found." });
      }

      res.status(200).send(shipment);
    });
};
