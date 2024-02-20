/**
 * This code contains the CRUD operations for file.
 */

const db = require("../../../models");
const File = db.file;
const processFileMiddleware = require("../middlewares/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const { Readable } = require('stream');

// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "config/google-cloud-key.json" });
const bucket = storage.bucket("poms-web-build-storage-bucket");

exports.createFile = (req, res) => {
    const file = new File({
        ...req.body,
    });

    file.save((err, createdFile) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // If the created file has a parentId, update the parent
        if (createdFile.parentId) {
            File.findOneAndUpdate(
                { id: createdFile.parentId }, // Find by id
                { $addToSet: { childrenIds: createdFile.id } },
                { new: true },
                (updateErr, updatedParent) => {
                    if (updateErr) {
                        res.status(500).send({ message: updateErr });
                        return;
                    }
                    res.status(200).send({ createdFile, updatedParent });
                }
            );
        } else {
            res.status(200).send(createdFile);
        }
    });
};

exports.getFiles = (req, res) => {
    File.find()
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
    File.findOne({ _id: req.body.file_id })
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


exports.getUploadProgress = (req, res) => {
    const fileId = req.params.id;
    console.log(fileId);
    File.findById({ _id: fileId })
    .exec((err, file) => {
        if (err || !file) {
                console.error('Error finding file:', err);
                res.status(500).send('Error finding file');
            } else {
                console.log(file);
                res.status(200).send(file);
            }
        });
};


exports.uploadFile = async (req, res) => {
    const uploadedFile = req.file;
    const folder_id = req.body.folder_id;

    if (!uploadedFile) {
        return res.status(400).send({ message: "Please upload a file!" });
    }

    const { originalname, size, mimetype } = uploadedFile;

    try {
        const blob = bucket.file(originalname);
        const blobStream = blob.createWriteStream();

        // Readable stream to track upload progress
        const fileBufferStream = new Readable();
        fileBufferStream.push(uploadedFile.buffer);
        fileBufferStream.push(null); // Signal the end of the stream

        const file = new File({
            name: originalname,
            parentId: folder_id,
            size: size,
            type: mimetype,
            uploadProgress: 100,
        });
        // Create and update the document in a single atomic operation
        const savedFile = await file.save();

        // Save the file immediately and return it to the client
        res.status(200).json({ savedFile });

        // If the created file has a parentId, update the parent
        if (savedFile.parentId) {
            File.findOneAndUpdate(
                { id: savedFile.parentId }, // Find by id
                { $addToSet: { childrenIds: savedFile.id } },
                { new: true },
                (updateErr, updatedParent) => {
                    if (updateErr) {
                        console.error("Error updating parent:", updateErr);
                        // You might want to handle the update error here
                        return;
                    }
                    console.log("Parent updated:", updatedParent);
                }
            );
        }

        // Pipe the file buffer to the blob stream
fileBufferStream.pipe(blobStream)
.on("error", async (err) => {
    console.error("Error uploading to Google Cloud Storage:", err);
    res.status(500).send({ message: "Error uploading file" });

    // Update the upload progress in the document with an error status
    await File.findOneAndUpdate(
        { _id: savedFile._id },
        { $set: { uploadProgress: "error" } },
        { new: true }
    ).exec();
})
.on("finish", async () => {
    console.log("Upload complete!");

    // Set the file as public
    await blob.makePublic();

    // Get public URL
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

    // Update file in the database with the public URL
    const updatedFile = await File.findOneAndUpdate(
        { _id: savedFile._id },
        { $set: { source: publicUrl, type: mimetype, folder_id: folder_id, uploadProgress: 100 } },
        { new: true }
    ).exec();

    console.log('Final file updated:', updatedFile);
});

// // Use the "progress" event to track upload progress
// blobStream.on("progress", (progress) => {
// // Calculate upload progress based on the total bytes to be uploaded
// const uploadProgress = (progress.bytesWritten / size) * 100;

// // Update the upload progress in the document
// File.findOneAndUpdate(
//     { _id: savedFile._id },
//     { $set: { uploadProgress: uploadProgress.toFixed(2) } },
// ).exec();

// console.log(`Progress: ${uploadProgress.toFixed(2)}%`);
// });
    } catch (error) {
        console.error("Error uploading file to Google Cloud Storage:", error);
        res.status(500).send({ message: "Error uploading file" });
    }
};

exports.getListFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file.name,
                url: file.metadata.mediaLink,
            });
        });

        res.status(200).send(fileInfos);
    } catch (err) {
        console.log(err);

        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};


exports.download = async (req, res) => {
    try {
        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);

    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};