/**
 * This code contains the CRUD operations for folder.
 */
  
const db = require("../../../models");
const Folder = db.folder;

exports.createFolder = (req, res) => {
    const folder = new Folder({
        ...req.body
    });
    console.log(folder);
    folder.save((err, folder) => {
        if (req.body.parent_id) {
            Folder.findOneAndUpdate({ _id: req.body.parent_id }, { $push:{ 'folders' : folder._id }}, { new: true })
            .exec((err, folder) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
    
                if (!folder) {
                    return res.status(404).send({ message: "Folder Not found." });
                }
    
                res.status(200).send(folder);
            });
        } else {
            res.status(200).send(folder);
        }
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
};

exports.getFolders = (req, res) => {
    Folder.find({parent_id: null})
    .populate("folders", "-__v")
    .exec((err, folders) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!folders) {
            return res.status(404).send({ message: "Folder Not found." });
        }

        res.status(200).send(folders);
    });
};

exports.getFolderById = (req, res) => {
    Folder.findOne({_id: req.body.folder_id})
    .exec((err, folder) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!folder) {
            return res.status(404).send({ message: "Folder Not found." });
        }

        res.status(200).send(folder);
    });
};

exports.updateFolder = (req, res) => {
    const folder_updates = {
        ...req.body
    };

    Folder.findOneAndUpdate({ _id: req.params.id }, folder_updates, { new: true })
        .exec((err, folder) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!folder) {
                return res.status(404).send({ message: "Folder Not found." });
            }

            res.status(200).send(folder);
        });
};