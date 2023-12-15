/**
 * This code exports functions that can be used to create, read, update, and delete user site availability data.
 */
const db = require("../../../models");
const UserSiteAvailability = db.user_site_availability;

exports.createUserSiteAvailability = (req, res) => {
	const new_user_site_availability = new UserSiteAvailability({
		user_id: req.body.user_id,
		site_id: req.body.site_id
	});

	new_user_site_availability.save((err, user_site_availability) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

        res.status(200).send(user_site_availability);
	});
};

exports.getUserSiteAvailabilities = (req, res) => {
	UserSiteAvailability.find()
    .exec((err, user_site_availabilities) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user_site_availabilities) {
            return res.status(404).send({ message: "UserSiteAvailabilities Not found." });
        }

        res.status(200).send(user_site_availabilities);
    });
};

exports.updateUserSiteAvailability = (req, res) => {
    const user_site_availability_updates = {
        ...req.body
    };

    UserSiteAvailability.findOneAndUpdate({ _id: req.params.id }, user_site_availability_updates, { new: true })
        .exec((err, user_site_availability) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user_site_availability) {
                return res.status(404).send({ message: "UserSiteAvailability Not found." });
            }

            res.status(200).send(user_site_availability);
        });
};

