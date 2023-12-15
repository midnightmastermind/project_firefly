/**
 * This code exports functions that allow for the creation, retrieval, and updating of product permissions.
 * Product permissions specify which users have access to which products.
 */
const db = require("../../../models");
const siteHelper = require("../../../helper/site");

const ProductPermissions = db.product_permissions;
const Site = db.site;
exports.createProductPermissions = (req, res) => {
	const product_permissions = new ProductPermissions({
		user_id: req.body.user_id,
		product_id: req.body.product_id,
		permissions: req.body.permissions,
	});

	product_permissions.save((err, product_permission) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
        res.status(200).send(product_permission);
	});
};

exports.getProductPermissions = (req, res) => {
	ProductPermissions.find()
    .exec((err, product_permissions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!product_permissions) {
            return res.status(404).send({ message: "ProductPermissions Not found." });
        }

        res.status(200).send(product_permissions);
    });
};

exports.getProductPermissionsForSite = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({ domain: site_name }).exec((err, site) => {
        if (err || !site) {
            return res.status(404).send({ message: "Site not found." });
        }
	ProductPermissions.find({site_id: site._id})
    .exec((err, product_permissions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!product_permissions) {
            return res.status(404).send({ message: "ProductPermissions Not found." });
        }

        res.status(200).send(product_permissions);
    });
});
};

exports.getProductPermissionsForUser = (req, res) => {
	ProductPermissions.find({ user_id: req.userId })
    .exec((err, product_permissions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!product_permissions) {
            return res.status(404).send({ message: "ProductPermissions Not found." });
        }

        res.status(200).send(product_permissions);
    });
};

exports.updateProductPermissions = (req, res) => {
    const product_permissions_updates = {
        ...req.body
    };

    ProductPermissions.findOneAndUpdate({ _id: req.params.id }, product_permissions_updates, { new: true })
        .exec((err, product_permissions) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!product_permissions) {
                return res.status(404).send({ message: "ProductPermissions Not found." });
            }

            res.status(200).send(product_permissions);
        });
};


