// controllers/service.controller.js
const db = require("../../../models");
const Service = db.service;

// Create a new Service
exports.createService = (req, res) => {
  const service = new Service({
    title: req.body.title,
    content: req.body.content,
    // Add other fields as needed
  });

  service.save((err, service) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(service);
  });
};

// Get all Services
exports.getServices = (req, res) => {
  Service.find()
    .exec((err, services) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!services) {
        return res.status(404).send({ message: "Services not found." });
      }

      res.status(200).send(services);
    });
};

// Get a specific Service by ID
exports.getService = (req, res) => {
  Service.findById(req.params.id)
    .exec((err, service) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!service) {
        return res.status(404).send({ message: "Service not found." });
      }

      res.status(200).send(service);
    });
};

// Update a Service by ID
exports.updateService = (req, res) => {
  const serviceUpdates = {
    ...req.body
  };

  Service.findOneAndUpdate({ _id: req.params.id }, serviceUpdates, { new: true })
    .exec((err, service) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!service) {
        return res.status(404).send({ message: "Service not found." });
      }

      res.status(200).send(service);
    });
};

// Delete a Service by ID
exports.deleteService = (req, res) => {
  Service.findOneAndDelete({ _id: req.params.id })
    .exec((err, service) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!service) {
        return res.status(404).send({ message: "Service not found." });
      }

      res.status(200).send(service);
    });
};
