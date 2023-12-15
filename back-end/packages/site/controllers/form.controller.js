/**
 * This code is creating a new form, getting all forms, getting a specific form, getting a form by name, and updating a form.
 */
const db = require("../../../models");
const Form = db.form;
const population_path = {
    path: 'groupings',
    model: 'Grouping',
    populate: {
        path: 'questions',
        model: 'Question',
        populate: {
            path: 'options',
            model: 'Option'
        }
    }
};
exports.createForm = (req, res) => {
	const form = new Form({
		...req.data
	});

	form.save((err, form) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getForms = (req, res) => {
	Form.find()
    .populate(population_path)
    .exec((err, forms) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!forms) {
            return res.status(404).send({ message: "Forms Not found." });
        }

        res.status(200).send(forms);
    });
};

exports.getForm = (req, res) => {
    Form.find()
    .populate(population_path)
    .exec((err, forms) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!forms) {
            return res.status(404).send({ message: "Form Not found." });
        }

        res.status(200).send(forms);
    });
};

exports.getFormByName = (req, res) => {
    Form.findOne({domain: req.body.name})
    .exec((err, form) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!form) {
            return res.status(404).send({ message: "Form Not found." });
        }

        res.status(200).send(form);
    });
};

exports.updateForm = (req, res) => {
    const form_updates = {
        ...req.body
    };

    Form.findOneAndUpdate({ _id: req.params.id }, form_updates, { new: true })
        .exec((err, form) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!form) {
                return res.status(404).send({ message: "Form Not found." });
            }

            res.status(200).send(form);
        });
};

