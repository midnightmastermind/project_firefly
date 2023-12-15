/**
 * This code is creating a new grouping, getting all groupings, getting a specific grouping, getting a grouping by name, and updating a grouping.
 */
const db = require("../../../models");
const Grouping = db.grouping;

exports.createGrouping = (req, res) => {
	const grouping = new Grouping({
		...req.data
	});

	grouping.save((err, grouping) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getGroupings = (req, res) => {
	Grouping.find()
    .exec((err, groupings) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!groupings) {
            return res.status(404).send({ message: "Groupings Not found." });
        }

        res.status(200).send(groupings);
    });
};

exports.getGrouping = (req, res) => {
    Grouping.find()
    .exec((err, groupings) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!groupings) {
            return res.status(404).send({ message: "Grouping Not found." });
        }

        res.status(200).send(groupings);
    });
};

exports.getGroupingByName = (req, res) => {
    Grouping.findOne({domain: req.body.name})
    .exec((err, grouping) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!grouping) {
            return res.status(404).send({ message: "Grouping Not found." });
        }

        res.status(200).send(grouping);
    });
};

exports.updateGrouping = (req, res) => {
    const grouping_updates = {
        ...req.body
    };

    Grouping.findOneAndUpdate({ _id: req.params.id }, grouping_updates, { new: true })
        .exec((err, grouping) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!grouping) {
                return res.status(404).send({ message: "Grouping Not found." });
            }

            res.status(200).send(grouping);
        });
};

