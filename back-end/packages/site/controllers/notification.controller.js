// controllers/notification.controller.js
const db = require("../../../models");
const Notification = db.notification;

// Create a new Notification
exports.createNotification = (req, res) => {
  const notification = new Notification({
    ...req.body
    // Add other fields as needed
  });

  notification.save((err, notification) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(notification);
  });
};

// Get all Notifications
exports.getNotifications = (req, res) => {
  Notification.find()
    .exec((err, notifications) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notifications) {
        return res.status(404).send({ message: "Notifications not found." });
      }

      res.status(200).send(notifications);
    });
};

// Get a specific Notification by ID
exports.getNotification = (req, res) => {
  Notification.findById(req.params.id)
    .exec((err, notification) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notification) {
        return res.status(404).send({ message: "Notification not found." });
      }

      res.status(200).send(notification);
    });
};

// Update a Notification by ID
exports.updateNotification = (req, res) => {
  const notificationUpdates = {
    ...req.body
  };

  Notification.findOneAndUpdate({ _id: req.params.id }, notificationUpdates, { new: true })
    .exec((err, notification) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notification) {
        return res.status(404).send({ message: "Notification not found." });
      }

      res.status(200).send(notification);
    });
};

// Delete a Notification by ID
exports.deleteNotification = (req, res) => {
  Notification.findOneAndDelete({ _id: req.params.id })
    .exec((err, notification) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notification) {
        return res.status(404).send({ message: "Notification not found." });
      }

      res.status(200).send(notification);
    });
};
