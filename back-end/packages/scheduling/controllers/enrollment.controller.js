/**
 * This code is creating an enrollment, updating an enrollment, and getting enrollments.
 */
const db = require("../../../models");
const siteHelper = require("../../../helper/site");

const Enrollment = db.enrollment;
const User = db.user;
const Site = db.site;
exports.createEnrollment = (req, res) => {
    const enrollment = new Enrollment({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        enrolled: req.body.enrolled
    });

    enrollment.save((err, enrollment) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        User.findByIdAndUpdate(req.body.user_id, { $push: { enrollment: enrollment } })
            .exec(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send(enrollment);
            });
    });

};

exports.getEnrollments = (req, res) => {
    Enrollment.find()
        .exec((err, enrollments) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!enrollments) {
                return res.status(404).send({ message: "Enrollment Not found." });
            }

            res.status(200).send(enrollments);
        });
};

exports.getEnrollmentsForSite = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({ domain: site_name }).exec((err, site) => {
        if (err || !site) {
            return res.status(404).send({ message: "Site not found." });
        }
        Enrollment.find({ site_id: site._id })
            .exec((err, enrollments) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!enrollments) {
                    return res.status(404).send({ message: "Enrollment Not found." });
                }

                res.status(200).send(enrollments);
            });
    });
};

exports.getEnrollment = (req, res) => {
    Enrollment.find()
        .exec((err, enrollments) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!enrollments) {
                return res.status(404).send({ message: "Enrollment Not found." });
            }

            res.status(200).send(enrollments);
        });
};

exports.getEnrollmentsForUser = (req, res) => {
    Enrollment.find({ user_id: req.userId})
        .exec((err, enrollments) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!enrollments) {
                return res.status(404).send({ message: "Enrollment Not found." });
            }

            res.status(200).send(enrollments);
        });
};

exports.updateEnrollment = (req, res) => {
    const enrollment_updates = {
        ...req.body
    };

    Enrollment.findOneAndUpdate({ _id: req.params.id }, enrollment_updates, { new: true })
        .exec((err, enrollment) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!enrollment) {
                return res.status(404).send({ message: "Enrollment Not found." });
            }

            res.status(200).send(enrollment);
        });
};
