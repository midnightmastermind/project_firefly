/**
 * This code contains the CRUD operations for content.
 */
exports.allAccess = (req, res) => {
  res.status(200).send("Welcome to the Altus SuperUsership Program. This will be where our teacher and product catalogue will go.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Student Dashboard! USECASE: products that the user is enrolled in");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Content Admin Dashboard! USECASE: products and users that are connected to the site");
};

exports.superUserBoard = (req, res) => {
  res.status(200).send("SuperUser dashboard! USECASE: products, and users enrolled in those products, connected to the superUser");
};

exports.globalAdminBoard = (req, res) => {
    res.status(200).send("Global Admin Dashboard! USECASE: all products and users");
};



const db = require("../../../models");
const Content = db.content;

exports.createContent = (req, res) => {
	const content = new Content({
        ...req.body
	});

	content.save((err, content) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getContent = (req, res) => {
    Content.find()
    .exec((err, content) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!content) {
            return res.status(404).send({ message: "Content Not found." });
        }

        res.status(200).send(contents);
    });
};

exports.getContentBySite = (req, res) => {
    Content.findOne({site_id: req.body.site})
    .exec((err, content) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!content) {
            return res.status(404).send({ message: "Content Not found." });
        }

        res.status(200).send(content);
    });
};

exports.updateContent = (req, res) => {
    const content_updates = {
        ...req.body
    };

    Content.findOneAndUpdate({ _id: req.params.id }, content_updates, { new: true })
        .exec((err, content) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!content) {
                return res.status(404).send({ message: "Content Not found." });
            }

            res.status(200).send(content);
        });
};