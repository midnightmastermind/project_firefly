// controllers/cart_item.controller.js
const db = require("../../../models");
const CartItem = db.cart_item;

// Create a new CartItem
exports.createCartItem = (req, res) => {
  const cart_item = new CartItem({
    ...req.body
    // Add other fields as needed
  });

  cart_item.save((err, cart_item) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(cart_item);
  });
};

// Get all CartItems
exports.getCartItems = (req, res) => {
  CartItem.find()
    .exec((err, cart_items) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!cart_items) {
        return res.status(404).send({ message: "CartItems not found." });
      }

      res.status(200).send(cart_items);
    });
};

// Get a specific CartItem by ID
exports.getCartItem = (req, res) => {
  CartItem.findById(req.params.id)
    .exec((err, cart_item) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!cart_item) {
        return res.status(404).send({ message: "CartItem not found." });
      }

      res.status(200).send(cart_item);
    });
};

// Update a CartItem by ID
exports.updateCartItem = (req, res) => {
  const cart_itemUpdates = {
    ...req.body
  };

  CartItem.findOneAndUpdate({ _id: req.params.id }, cart_itemUpdates, { new: true })
    .exec((err, cart_item) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!cart_item) {
        return res.status(404).send({ message: "CartItem not found." });
      }

      res.status(200).send(cart_item);
    });
};

// Delete a CartItem by ID
exports.deleteCartItem = (req, res) => {
  CartItem.findOneAndDelete({ _id: req.params.id })
    .exec((err, cart_item) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!cart_item) {
        return res.status(404).send({ message: "CartItem not found." });
      }

      res.status(200).send(cart_item);
    });
};
