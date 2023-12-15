/**
 * This code is for creating, retrieving, updating, and deleting users.
 * It also includes a function for getting all superUsers for a specific site.
 */

const db = require("../../../models");
const User = db.user;
const siteHelper = require("../../../helper/site");

const User_Site_Availability = db.user_site_availability;
const Global_Permissions = db.global_permissions;
const Site = db.site;
const Site_Permissions = db.site_permissions;

exports.createUser = (req, res) => {
	const user = new User({
        ...req.body
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getUsers = async (req, res) => {
    Site_Permissions.find()
        .populate("roles", "-__v")
        .exec((err, site_permissions) => {
            if (err) {
                return err;
            }

            Global_Permissions.find()
                .populate("roles", "-__v")
                .exec((err, global_permissions) => {
                    if (err) {
                        return err;
                    }

                    User.find()
                        .exec((err, users) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            if (!users) {
                                return res.status(404).send({ message: "Products Not found." });
                            }

                            res.status(200).send(users);

                        });

                });
        });
};

exports.getUsersForSite = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({
        domain: site_name
    }).exec((err, site) => {
        if (err) {
            return err;
        }

        User_Site_Availability.find({ site_id: site._id })
            .select('user_id -_id')
            .exec((err, user_site_availability) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                User.find()
                    .exec((err, users) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        users = siteHelper.filterFromList(users, user_site_availability, 'user_id');


                        if (!users) {
                            return res.status(404).send({ message: "Users Not found." });
                        }

                        res.status(200).send(users);
                    });
            });
    });
};

exports.getUser = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({
        domain: site_name
    }).exec((err, site) => {
        if (err) {
            return err;
        }

        User_Site_Availability.find({ site_id: site._id })
            .select('user_id -_id')
            .exec((err, user_site_availability) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                User.findOne({ _id: req.params.id })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        user = siteHelper.filterFromList(user, user_site_availability, 'user_id');


                        if (!user) {
                            return res.status(404).send({ message: "User Not found." });
                        }
                        const user_info = {
                            first_name: user.first_name,
                            last_name: user.last_name
                        }
                        res.status(200).send(user_info);

                    });
            });
    });
};

exports.getSuperUsers = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({
        domain: site_name
    }).exec((err, site) => {
        if (err || !site) {
            return err;
        }

        User_Site_Availability.find({ site_id: site._id })
            .select('user_id')
            .exec((err, user_site_availability) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                Site_Permissions.aggregate([
                    { $match: { 'site_id': site._id } },
                    {
                        $lookup: {
                            from: "roles",
                            localField: "roles",
                            foreignField: "_id",
                            as: "role"

                        }
                    },
                    {
                        $match: {
                            "role.name": "superUser"
                        }
                    }
                ])
                    .exec((err, site_permissions) => {
                        if (err) {
                            return null;
                        }

                        User.find()
                            .select('first_name last_name _id description profile_image')
                            .exec((err, users) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                users = siteHelper.filterFromList(users, site_permissions, 'user_id', 'superUser');
                                users = siteHelper.filterFromList(users, user_site_availability, 'user_id', null);



                                if (!users) {
                                    return res.status(404).send({ message: "Users Not found." });
                                }
                                return res.status(200).send(users);
                            });
                    });
            });
    });
};

exports.updateUser = (req, res) => {
    const user_updates = {
        ...req.body
    };

    User.findOneAndUpdate({ _id: req.params.id }, user_updates, { new: true })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            res.status(200).send(user);
        });
};
