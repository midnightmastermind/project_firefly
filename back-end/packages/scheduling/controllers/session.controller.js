/**
 * The code above is creating, retrieving, and updating sessions.
 */
const db = require("../../../models");
const Session = db.session;

exports.createSession = (req, res) => {
    // const session = {
    //     ...req.body
    // };

    const session = new Session({
		title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status
	});


	session.save((err, session) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
        res.status(200).send(session);
	});
};

exports.getSessions = (req, res) => {
	Session.find()
    .exec((err, sessions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!sessions) {
            return res.status(404).send({ message: "Sessions Not found." });
        }

        const editedSessions = sessions.map((session) => {
            let id = session._id;
            return {
                title: session.title,
                start: session.start,
                id: id,
                end: session.end,
                status: session.status
            }
        });

        res.status(200).send(editedSessions);
    });
};

exports.getSession = (req, res) => {
    Session.find()
    .exec((err, sessions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!sessions) {
            return res.status(404).send({ message: "Session Not found." });
        }

        res.status(200).send(sessions);
    });
};

exports.updateSession = (req, res) => {
    const session_updates = {
        ...req.body
    };

    Session.findOneAndUpdate({ _id: req.params.id }, session_updates, { new: true })
        .exec((err, session) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!session) {
                return res.status(404).send({ message: "Session Not found." });
            }

            res.status(200).send(session);
        });
};
