/**
 * This code is creating a new site, getting all sites, getting a specific site, getting a site by name, and updating a site.
 */
const db = require("../../../models");
const Site = db.site;

exports.createSite = (req, res) => {
	const site = new Site({
        ...req.body
	});

	site.save((err, site) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getSites = (req, res) => {
	Site.find()
    .exec((err, sites) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!sites) {
            return res.status(404).send({ message: "Sites Not found." });
        }

        res.status(200).send(sites);
    });
};

exports.getSite = (req, res) => {
    Site.find()
    .exec((err, sites) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!sites) {
            return res.status(404).send({ message: "Site Not found." });
        }

        res.status(200).send(sites);
    });
};

exports.getSiteByName = (req, res) => {
    Site.findOne({domain: req.body.name})
    .exec((err, site) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!site) {
            return res.status(404).send({ message: "Site Not found." });
        }

        res.status(200).send(site);
    });
};

exports.updateSite = (req, res) => {
    const site_updates = {
        ...req.body
    };

    Site.findOneAndUpdate({ _id: req.params.id }, site_updates, { new: true })
        .exec((err, site) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!site) {
                return res.status(404).send({ message: "Site Not found." });
            }

            res.status(200).send(site);
        });
};



exports.deleteSite = (req, res) => {
    const site_updates = {
        ...req.body
    };

    Site.findOneAndUpdate({ _id: req.params.id }, {status: 'deleted'})
        .exec((err, site) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!site) {
                return res.status(404).send({ message: "Site Not found." });
            }

            res.status(200).send(site);
        });
};