// // controllers/conversation.controller.js
// const db = require("../../../models");
// const Conversation = db.conversation;

// // Create a new Conversation
// exports.createConversation = (req, res) => {
//   const conversation = new Conversation({
//     ...req.body
//     // Add other fields as needed
//   });

//   conversation.save((err, conversation) => {
//     if (err) {
//       res.status(500).send({ conversation: err });
//       return;
//     }
//     res.status(200).send(conversation);
//   });
// };

// // Get all Conversations
// exports.getConversations = (req, res) => {
//   Conversation.find()
//     .exec((err, conversations) => {
//       if (err) {
//         res.status(500).send({ conversation: err });
//         return;
//       }

//       if (!conversations) {
//         return res.status(404).send({ conversation: "Conversations not found." });
//       }

//       res.status(200).send(conversations);
//     });
// };

// // Get a specific Conversation by ID
// exports.getConversation = (req, res) => {
//   Conversation.findById(req.params.id)
//     .exec((err, conversation) => {
//       if (err) {
//         res.status(500).send({ conversation: err });
//         return;
//       }

//       if (!conversation) {
//         return res.status(404).send({ conversation: "Conversation not found." });
//       }

//       res.status(200).send(conversation);
//     });
// };

// // Update a Conversation by ID
// exports.updateConversation = (req, res) => {
//   const conversationUpdates = {
//     ...req.body
//   };

//   Conversation.findOneAndUpdate({ _id: req.params.id }, conversationUpdates, { new: true })
//     .exec((err, conversation) => {
//       if (err) {
//         res.status(500).send({ conversation: err });
//         return;
//       }

//       if (!conversation) {
//         return res.status(404).send({ conversation: "Conversation not found." });
//       }

//       res.status(200).send(conversation);
//     });
// };

// // Delete a Conversation by ID
// exports.deleteConversation = (req, res) => {
//   Conversation.findOneAndDelete({ _id: req.params.id })
//     .exec((err, conversation) => {
//       if (err) {
//         res.status(500).send({ conversation: err });
//         return;
//       }

//       if (!conversation) {
//         return res.status(404).send({ conversation: "Conversation not found." });
//       }

//       res.status(200).send(conversation);
//     });
// };


// controllers/chat/conversation.controller.js
const Conversation = require('../models/conversation.model');

exports.createConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    const conversation = await Conversation.create({
      participants,
      messages: [],
    });

    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);
    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { participants } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { participants },
      { new: true }
    );

    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    await Conversation.findByIdAndDelete(id);
    res.json({ success: true, message: 'Conversation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
