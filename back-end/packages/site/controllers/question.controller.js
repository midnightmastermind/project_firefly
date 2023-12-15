/**
 * This code is creating a new question, getting all questions, getting a specific question, getting a question by name, and updating a question.
 */
const db = require("../../../models");
const Question = db.question;

exports.createQuestion = (req, res) => {
	const question = new Question({
		...req.data
	});

	question.save((err, question) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
	});
};

exports.getQuestions = (req, res) => {
	Question.find()
    .exec((err, questions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!questions) {
            return res.status(404).send({ message: "Questions Not found." });
        }

        res.status(200).send(questions);
    });
};

exports.getQuestion = (req, res) => {
    Question.find()
    .exec((err, questions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!questions) {
            return res.status(404).send({ message: "Question Not found." });
        }

        res.status(200).send(questions);
    });
};

exports.getQuestionByName = (req, res) => {
    Question.findOne({domain: req.body.name})
    .exec((err, question) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!question) {
            return res.status(404).send({ message: "Question Not found." });
        }

        res.status(200).send(question);
    });
};

exports.updateQuestion = (req, res) => {
    const question_updates = {
        ...req.body
    };

    Question.findOneAndUpdate({ _id: req.params.id }, question_updates, { new: true })
        .exec((err, question) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!question) {
                return res.status(404).send({ message: "Question Not found." });
            }

            res.status(200).send(question);
        });
};

