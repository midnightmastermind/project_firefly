/**
 * This code is creating a new option, getting all options, getting a specific option, getting a option by name, and updating a option.
 */
const db = require("../../../models");
const Option = db.option;

exports.createOption = (req, res) => {
	const option = new Option({
		...req.data
	});

	option.save((err, option) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getOptions = (req, res) => {
	Option.find()
    .exec((err, options) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!options) {
            return res.status(404).send({ message: "Options Not found." });
        }

        res.status(200).send(options);
    });
};

exports.getOption = (req, res) => {
    Option.find()
    .exec((err, options) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!options) {
            return res.status(404).send({ message: "Option Not found." });
        }

        res.status(200).send(options);
    });
};

exports.getOptionByName = (req, res) => {
    Option.findOne({domain: req.body.name})
    .exec((err, option) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!option) {
            return res.status(404).send({ message: "Option Not found." });
        }

        res.status(200).send(option);
    });
};

exports.updateOption = (req, res) => {
    const option_updates = {
        ...req.body
    };

    Option.findOneAndUpdate({ _id: req.params.id }, option_updates, { new: true })
        .exec((err, option) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!option) {
                return res.status(404).send({ message: "Option Not found." });
            }

            res.status(200).send(option);
        });
};

