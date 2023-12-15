/**
 * This code is creating an attendance model, which requires a user_id, session_id, and attendance_start.
 * It then saves this model to the database.
 * There are also functions to get all attendances or a specific attendance, as well as to update an attendance.
 */
const db = require("../../../models");
const Attendance = db.attendance;

exports.createAttendance = (req, res) => {
	const attendance = new Attendance({
		user_id: req.body.user_id,
		session_id: req.body.session_id,
		attendance_start: req.body.attendance_start,
	});

	attendance.save((err, attendance) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getAttendances = (req, res) => {
	Attendance.find()
    .exec((err, attendances) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!attendances) {
            return res.status(404).send({ message: "Attendances Not found." });
        }

        res.status(200).send(attendances);
    });
};

exports.getAttendance = (req, res) => {
    Attendance.find()
    .exec((err, attendances) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!attendances) {
            return res.status(404).send({ message: "Attendance Not found." });
        }

        res.status(200).send(attendances);
    });
};

exports.updateAttendance = (req, res) => {
    const attendance_updates = {
        ...req.body
    };

    Attendance.findOneAndUpdate({ _id: req.params.id }, attendance_updates, { new: true })
        .exec((err, attendance) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!attendance) {
                return res.status(404).send({ message: "Attendance Not found." });
            }

            res.status(200).send(attendance);
        });
};
