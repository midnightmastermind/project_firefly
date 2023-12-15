// controllers/permission.controller.js
const db = require("../../../models");
const Permission = db.permission;

// Create a new Permission
exports.createPermission = (req, res) => {
  const permission = new Permission({
    ...req.body
    // Add other fields as needed
  });

  permission.save((err, permission) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(permission);
  });
};

// Get all Permissions
exports.getPermissions = (req, res) => {
  Permission.find()
    .exec((err, permissions) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!permissions) {
        return res.status(404).send({ message: "Permissions not found." });
      }

      res.status(200).send(permissions);
    });
};

// Get a specific Permission by ID
exports.getPermission = (req, res) => {
  Permission.findById(req.params.id)
    .exec((err, permission) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!permission) {
        return res.status(404).send({ message: "Permission not found." });
      }

      res.status(200).send(permission);
    });
};

// Update a Permission by ID
exports.updatePermission = (req, res) => {
  const permissionUpdates = {
    ...req.body
  };

  Permission.findOneAndUpdate({ _id: req.params.id }, permissionUpdates, { new: true })
    .exec((err, permission) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!permission) {
        return res.status(404).send({ message: "Permission not found." });
      }

      res.status(200).send(permission);
    });
};

// Delete a Permission by ID
exports.deletePermission = (req, res) => {
  Permission.findOneAndDelete({ _id: req.params.id })
    .exec((err, permission) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!permission) {
        return res.status(404).send({ message: "Permission not found." });
      }

      res.status(200).send(permission);
    });
};
