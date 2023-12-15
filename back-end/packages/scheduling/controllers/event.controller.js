// controllers/event.controller.js
const db = require("../../../models");
const Event = db.event;

// Create a new Event
exports.createEvent = (req, res) => {
  const event = new Event({
    ...req.body
    // Add other fields as needed
  });

  event.save((err, event) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(event);
  });
};

// Get all Events
exports.getEvents = (req, res) => {
  Event.find()
    .exec((err, events) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!events) {
        return res.status(404).send({ message: "Events not found." });
      }

      res.status(200).send(events);
    });
};

// Get a specific Event by ID
exports.getEvent = (req, res) => {
  Event.findById(req.params.id)
    .exec((err, event) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!event) {
        return res.status(404).send({ message: "Event not found." });
      }

      res.status(200).send(event);
    });
};

// Update a Event by ID
exports.updateEvent = (req, res) => {
  const eventUpdates = {
    ...req.body
  };

  Event.findOneAndUpdate({ _id: req.params.id }, eventUpdates, { new: true })
    .exec((err, event) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!event) {
        return res.status(404).send({ message: "Event not found." });
      }

      res.status(200).send(event);
    });
};

// Delete a Event by ID
exports.deleteEvent = (req, res) => {
  Event.findOneAndDelete({ _id: req.params.id })
    .exec((err, event) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!event) {
        return res.status(404).send({ message: "Event not found." });
      }

      res.status(200).send(event);
    });
};
