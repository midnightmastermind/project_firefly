const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
          },
          description: String,
          recurring: {
            type: Boolean,
            default: false,
          },
          recurrenceInterval: {
            type: String,
          },
          scheduledDate: {
            type: Date,
          },
          dueDate: {
            type: Date,
          },
          priority: {
            type: String,
          },
          labels: {
            type: [String],
          },
          subtasks: [
            {
              title: {
                type: String,
                required: true,
              },
              completed: {
                type: Boolean,
                default: false,
              },
            },
          ],
          notes: String,
          assignee: {
            type: String,
          },
          completed: {
            type: Boolean,
            default: false,
          },
          reminders: [
            {
              date: {
                type: Date,
              },
              method: {
                type: String, // You might use 'email', 'push', 'sms', etc.
              },
            },
          ],
          project: {
            type: String,
          },
    })
);

module.exports = Task;