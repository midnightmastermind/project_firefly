/**
 * This code contains the CRUD operations for post.
 */
  
const db = require("../../../models");
const Post = db.post;

exports.createPost = (req, res) => {
    const new_post = new Post({
        ...req.body
    });
    
    console.log(new_post);
    new_post.save((err, post) => {
      console.log(post);
      console.log(err);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(post);
    });
};

exports.getPosts = (req, res) => {
    Post.find()
    .exec((err, posts) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!posts) {
            return res.status(404).send({ message: "Post Not found." });
        }

        res.status(200).send(posts);
    });
};

exports.getPostById = (req, res) => {
    Post.findOne({_id: req.body.post_id})
    .exec((err, post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!post) {
            return res.status(404).send({ message: "Post Not found." });
        }
        post.id = post._id;
        res.status(200).send(post);
    });
};

exports.updatePost = (req, res) => {
    const post_updates = {
        ...req.body
    };

    Post.findOneAndUpdate({ _id: req.params.id }, post_updates, { new: true })
        .exec((err, post) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!post) {
                return res.status(404).send({ message: "Post Not found." });
            }

            res.status(200).send(post);
        });
};

exports.deletePost = (req, res) => {
    const post_updates = {
        ...req.body
    };

    Post.findOneAndUpdate({ _id: req.params.id }, {status: 'deleted'})
        .exec((err, post) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!post) {
                return res.status(404).send({ message: "Post Not found." });
            }

            res.status(200).send(post);
        });
};