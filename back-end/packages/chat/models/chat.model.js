const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  unreadCounter: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  draft: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      id: {
        type: String,
        required: true,
      },
      role: {
        permissions: {
          type: [String],
          default: [],
        },
      },
    },
  ],
  typingUsers: {
    items: {
      type: [String],
      default: [],
    },
  },
  messages: {
    type: Array,
    default: []
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
