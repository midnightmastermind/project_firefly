/**
 * This code contains the CRUD operations for video_source.
 */
  
const db = require("../../../models");
const MediaSource = db.video_source;

exports.createMediaSource = (req, res) => {
    const new_video_source = new MediaSource({
        ...req.body
    });
    
    console.log(new_video_source);
    new_video_source.save((err, video_source) => {
      console.log(video_source);
      console.log(err);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(video_source);
    });
};

exports.getMediaSources = (req, res) => {
    MediaSource.find()
    .exec((err, video_sources) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!video_sources) {
            return res.status(404).send({ message: "MediaSource Not found." });
        }

        res.status(200).send(video_sources);
    });
};

exports.getMediaSourceById = (req, res) => {
    MediaSource.findOne({_id: req.body.video_source_id})
    .exec((err, video_source) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!video_source) {
            return res.status(404).send({ message: "MediaSource Not found." });
        }
        video_source.id = video_source._id;
        res.status(200).send(video_source);
    });
};

exports.updateMediaSource = (req, res) => {
    const video_source_updates = {
        ...req.body
    };

    MediaSource.findOneAndUpdate({ _id: req.params.id }, video_source_updates, { new: true })
        .exec((err, video_source) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!video_source) {
                return res.status(404).send({ message: "MediaSource Not found." });
            }

            res.status(200).send(video_source);
        });
};