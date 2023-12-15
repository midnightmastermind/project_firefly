/**
 * This code contains the CRUD operations for file.
 */
  
const db = require("../../../models");
const File = db.file;

exports.createFile = (req, res) => {
    console.log(req.files); 
    // const new_file = new File({
    //     ...req.body
    // });
    
    // console.log(new_file);
    // new_file.save((err, file) => {
    //   console.log(file);
    //   console.log(err);
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }
    //     res.status(200).send(file);
    // });
};

exports.getFiles = (req, res) => {
    File.find()
    .populate("children", "-__v")
    .exec((err, files) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!files) {
            return res.status(404).send({ message: "File Not found." });
        }

        res.status(200).send(files);
    });
};

exports.getFileById = (req, res) => {
    File.findOne({_id: req.body.file_id})
    .exec((err, file) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!file) {
            return res.status(404).send({ message: "File Not found." });
        }

        res.status(200).send(file);
    });
};

exports.updateFile = (req, res) => {
    const file_updates = {
        ...req.body
    };

    File.findOneAndUpdate({ _id: req.params.id }, file_updates, { new: true })
        .exec((err, file) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!file) {
                return res.status(404).send({ message: "File Not found." });
            }

            res.status(200).send(file);
        });
};