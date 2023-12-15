/**
 * This code is creating a new user_form_response, getting all user_form_responses, getting a specific user_form_response, getting a user_form_response by name, and updating a user_form_response.
 */
const db = require("../../../models");
const UserFormResponse = db.user_form_response;

exports.createUserFormResponse = (req, res) => {
	const user_form_response = new UserFormResponse({
		...req.data
	});

	user_form_response.save((err, user_form_response) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getUserFormResponses = (req, res) => {
	UserFormResponse.find()
    .exec((err, user_form_responses) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user_form_responses) {
            return res.status(404).send({ message: "UserFormResponses Not found." });
        }

        res.status(200).send(user_form_responses);
    });
};

exports.getUserFormResponse = (req, res) => {
    UserFormResponse.find()
    .exec((err, user_form_responses) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user_form_responses) {
            return res.status(404).send({ message: "UserFormResponse Not found." });
        }

        res.status(200).send(user_form_responses);
    });
};

exports.getUserFormResponseByName = (req, res) => {
    UserFormResponse.findOne({domain: req.body.name})
    .exec((err, user_form_response) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user_form_response) {
            return res.status(404).send({ message: "UserFormResponse Not found." });
        }

        res.status(200).send(user_form_response);
    });
};

exports.updateUserFormResponse = (req, res) => {
    const user_form_response_updates = {
        ...req.body
    };

    UserFormResponse.findOneAndUpdate({ _id: req.params.id }, user_form_response_updates, { new: true })
        .exec((err, user_form_response) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user_form_response) {
                return res.status(404).send({ message: "UserFormResponse Not found." });
            }

            res.status(200).send(user_form_response);
        });
};

