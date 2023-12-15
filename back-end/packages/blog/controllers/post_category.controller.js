// controllers/post_category.controller.js
const db = require("../../../models");
const PostCategory = db.post_category;

// Create a new PostCategory
exports.createPostCategory = (req, res) => {
  const post_category = new PostCategory({
    ...req.body
    // Add other fields as needed
  });

  post_category.save((err, post_category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(post_category);
  });
};

// Get all PostCategories
exports.getPostCategories = (req, res) => {
  PostCategory.find()
    .exec((err, post_categorys) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!post_categorys) {
        return res.status(404).send({ message: "PostCategories not found." });
      }

      res.status(200).send(post_categorys);
    });
};

// Get a specific PostCategory by ID
exports.getPostCategory = (req, res) => {
  PostCategory.findById(req.params.id)
    .exec((err, post_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!post_category) {
        return res.status(404).send({ message: "PostCategory not found." });
      }

      res.status(200).send(post_category);
    });
};

// Update a PostCategory by ID
exports.updatePostCategory = (req, res) => {
  const post_categoryUpdates = {
    ...req.body
  };

  PostCategory.findOneAndUpdate({ _id: req.params.id }, post_categoryUpdates, { new: true })
    .exec((err, post_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!post_category) {
        return res.status(404).send({ message: "PostCategory not found." });
      }

      res.status(200).send(post_category);
    });
};

// Delete a PostCategory by ID
exports.deletePostCategory = (req, res) => {
  PostCategory.findOneAndDelete({ _id: req.params.id })
    .exec((err, post_category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!post_category) {
        return res.status(404).send({ message: "PostCategory not found." });
      }

      res.status(200).send(post_category);
    });
};
