// controllers/page.controller.js
const db = require("../../../models");
const Page = db.page;

// Create a new Page
exports.createPage = (req, res) => {
  const page = new Page({
    ...req.body
    // Add other fields as needed
  });

  page.save((err, page) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(page);
  });
};

// Get all Pages
exports.getPages = (req, res) => {
  Page.find()
    .exec((err, pages) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!pages) {
        return res.status(404).send({ message: "Pages not found." });
      }

      res.status(200).send(pages);
    });
};

// Get a specific Page by ID
exports.getPage = (req, res) => {
  Page.findById(req.params.id)
    .exec((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!page) {
        return res.status(404).send({ message: "Page not found." });
      }

      res.status(200).send(page);
    });
};

// Update a Page by ID
exports.updatePage = (req, res) => {
  const pageUpdates = {
    ...req.body
  };

  Page.findOneAndUpdate({ _id: req.params.id }, pageUpdates, { new: true })
    .exec((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!page) {
        return res.status(404).send({ message: "Page not found." });
      }

      res.status(200).send(page);
    });
};

// Delete a Page by ID
exports.deletePage = (req, res) => {
  Page.findOneAndDelete({ _id: req.params.id })
    .exec((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!page) {
        return res.status(404).send({ message: "Page not found." });
      }

      res.status(200).send(page);
    });
};
