/**
 * The code is creating, retrieving, updating, and deleting site product availabilities.
 */
const db = require("../../../models");
const SiteProductAvailability = db.site_product_availability;

exports.createSiteProductAvailability = (req, res) => {
	const site_product_availability = new SiteProductAvailability({
		product_id: req.body.product_id,
		site_id: req.body.site_id
	});

	site_product_availability.save((err, product_availability) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
        
        res.status(200).send(product_availability);
    
	});
};

exports.getSiteProductAvailabilities = (req, res) => {
	SiteProductAvailability.find()
    .exec((err, site_product_availabilities) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!site_product_availabilities) {
            return res.status(404).send({ message: "SiteProductAvailabilities Not found." });
        }

        res.status(200).send(site_product_availabilities);
    });
};

exports.getSiteProductAvailability = (req, res) => {
    SiteProductAvailability.find()
    .exec((err, site_product_availabilities) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!site_product_availabilities) {
            return res.status(404).send({ message: "SiteProductAvailability Not found." });
        }

        res.status(200).send(site_product_availabilities);
    });
};

exports.deleteSiteProductAvailability = (req, res) => {
    SiteProductAvailability.deleteOne({_id: req.id})
    .exec((err, site_product_availability) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!site_product_availabilities) {
            return res.status(404).send({ message: "SiteProductAvailability Not found." });
        }

        res.status(200).send(req.id);
    });
};

exports.updateSiteProductAvailability = (req, res) => {
    const site_product_availability_updates = {
        ...req.body
    };

    SiteProductAvailability.findOneAndUpdate({ _id: req.params.id }, site_product_availability_updates, { new: true })
        .exec((err, site_product_availability) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!site_product_availability) {
                return res.status(404).send({ message: "SiteProductAvailability Not found." });
            }

            res.status(200).send(site_product_availability);
        });
};