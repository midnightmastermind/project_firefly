/**
 * This code is for the SitePermissions model.
 * It has functions for creating, reading, updating, and deleting site permissions.
 */
const db = require("../../../models");
const SitePermissions = db.site_permissions;

exports.createSitePermissions = (req, res) => {
    const site_permissions = new SitePermissions({
        ...req.body
    });
    Role.findOne({ name: req.params.role })
        .exec((err, role) => {
            site_permissions.roles = role._id;
            site_permissions.save((err, site_permission) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });
        });
};

exports.getSitePermissions = (req, res) => {
    SitePermissions.find()
        .populate("roles", "-__v")
        .exec((err, site_permissions) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!site_permissions) {
                return res.status(404).send({ message: "SitePermissions Not found." });
            }

            res.status(200).send(site_permissions);
        });
};

exports.getSitePermissionsByUser = (req, res) => {
    const site_name = req.subdomains[0];
    SitePermissions.find({ user_id: res.params.user_id })
        .exec((err, site_permissions) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!site_permissions) {
                return res.status(404).send({ message: "SitePermissions Not found." });
            }

            res.status(200).send(site_permissions);
        });
};

exports.updateSitePermissions = (req, res) => {
    const site_permissions_updates = {
        ...req.body
    };
    Role.findOne({ name: req.params.role })
        .exec((err, role) => {
            site_permissions_updates.roles = role._id;
            SitePermissions.findOneAndUpdate({ _id: req.params.id }, site_permissions_updates, { new: true })
                .exec((err, site_permissions) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (!site_permissions) {
                        return res.status(404).send({ message: "SitePermissions Not found." });
                    }

                    res.status(200).send(site_permissions);
                });
        });
};

