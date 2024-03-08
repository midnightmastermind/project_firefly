const express = require("express");
const handleSocketEvents = require('./packages/chat/controllers/chat.controller');

const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require('path');
const socketIO = require('socket.io');
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"]
  }
});
require('dotenv').config();
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

if (process.env.NODE_ENV !== 'local') {
  app.use(express.static(path.join(__dirname, 'front-end', 'build')));

  app.get('*', function (req, res, next) {
    if (req.url === '/' || req.url.includes('/api')) return next();
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
  });
}
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  if (req.get('Referrer')) {
    res.setHeader('Access-Control-Allow-Origin', req.get('Referrer'))
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  }
  next();
});

const db = require("./models");

let connection_string = `mongodb://127.0.0.1:${dbConfig.PORT}/${dbConfig.DB}`;

// if (process.env.NODE_ENV !== 'local') {
//     let DB = `${dbConfig.DB}`;
//     if (process.env.NODE_ENV === 'dev') {
//         DB += "_dev";
//     }
//     connection_string = `mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${DB}?authSource=admin&retryWrites=true&w=majority`;
// }

db.mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes

require("./packages/auth/routes/user.routes")(app);
require("./packages/auth/routes/site_permissions.routes")(app);
require("./packages/auth/routes/auth.routes")(app);
require("./packages/site/routes/site.routes")(app);

// require("./packages/site/routes/user_site_availability.routes")(app);
// require("./packages/site/routes/site_product_availability.routes")(app);
require("./packages/site_builder/routes/page.routes")(app);
// require("./packages/site/routes/content.routes")(app);

// require("./packages/blog/routes/post.routes")(app);

require("./packages/storage/routes/file.routes")(app);
// require("./packages/storage/routes/folder.routes")(app);

// require("./packages/scheduling/routes/session.routes")(app);
// require("./packages/scheduling/routes/enrollment.routes")(app);
// require("./packages/scheduling/routes/attendance.routes")(app);

// require("./packages/ecommerce/routes/transaction.routes")(app);
// require("./packages/ecommerce/routes/product_permissions.routes")(app);
// require("./packages/ecommerce/routes/product.routes")(app);
// require("./packages/ecommerce/routes/cart_item.routes")(app);
// require("./packages/ecommerce/routes/stripe.routes")(app);
const Chat = require('./packages/chat/models/chat.model');
const ChatMessage = require('./packages/chat/models/chat_message.model');
// const ShopifyProduct = require('./packages/ecommerce/models/shopify_product.model');
// const Task = require('./packages/scheduling/models/task.model');
// const ShopifyOrder = require('./packages/ecommerce/models/shopify_order.model');
// const Shopify = require('shopify-api-node'); // Assuming you have this installed
// const ecommerceConfig = require('./config/ecommerce.config');

// console.log(ecommerceConfig);

// const shopify = new Shopify({
//   shopName: ecommerceConfig.shopify.shopName,
//   // apiKey: ecommerceConfig.shopify.apiKey,
//   // password: ecommerceConfig.shopify.apiPassword,
//   accessToken: ecommerceConfig.shopify.accessToken,
//   apiVersion: '2023-07'
// });


// require("./packages/chat/routes/conversation.routes")(app);
// require("./packages/chat/routes/chat_message.routes")(app);
// require("./packages/chat/routes/chat.routes")(app);

// Models loading
const models = [];

// Iterate through the db object
for (const modelName in db) {
  if (Object.hasOwnProperty.call(db, modelName)) {
    const schema = new mongoose.Schema(db[modelName].schema);
    models.push({ name: modelName, schema });
  }
}

// HTTP CRUD Operations
models.forEach(({ name, schema }) => {
  const Model = mongoose.model(name, schema);

  // Create
  app.post(`/api/${name.toLowerCase()}`, async (req, res) => {
    try {
      const newEntity = new Model(req.body);
      const result = await newEntity.save();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Read All
  app.get(`/api/${name.toLowerCase()}`, async (req, res) => {
    try {
      const entities = await Model.find();
      res.json(entities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update
  app.put(`/api/${name.toLowerCase()}/:id`, async (req, res) => {
    try {
      const updatedEntity = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEntity) {
        return res.status(404).json({ error: `${name} not found` });
      }
      res.json(updatedEntity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete
  app.delete(`/api/${name.toLowerCase()}/:id`, async (req, res) => {
    try {
      const deletedEntity = await Model.findByIdAndDelete(req.params.id);
      if (!deletedEntity) {
        return res.status(404).json({ error: `${name} not found` });
      }
      res.json(deletedEntity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

  const userSocketMap = new Map();

  // Socket.IO Event Handling
  io.on('connection', (socket) => {
    socket.on('setUserId', (userId) => {
      // Store the mapping of userId to socket.id
      userSocketMap.set(userId, socket.id);
      console.log(`${userId}-io-connected`);
    });
  
  //   socket.on('action', (action) => {
  //     if (action.type === 'server/hello') {
  //       socket.emit('action', { type: 'message', data: 'good day!' });
  //     } else if (action.type === 'server/fetchChats') {
  //       Chat.find({ 'participants.id': action.data }).exec((err, chats) => {
  //         if (err) {
  //           io.emit('errorMessage', { message: 'Chat not found' });
  //         } else {
  //           if (!chats || chats.length === 0) {
  //             io.emit('action', { type: 'get_chats', data: [] });
  //           } else {
  //             io.emit('action', { type: 'get_chats', data: chats });
  //           }
  //         }
  //       });
  //     } else if (action.type === 'server/createChat') {
  //       const chat_data = action.data;
  //       const chat = new Chat({ ...chat_data, messages: [] });

  //       chat.save((err, savedChat) => {
  //         if (err) {
  //           io.emit('errorMessage', { message: 'Chat not found' });
  //         } else {
  //           io.emit('action', { type: 'create_chat', data: savedChat });
  //         }
  //       });
  //     } else if (action.type === 'server/fetchChatMessages') {
  //       const conversationId = action.data;
  //       ChatMessage.find({ 'conversationId': conversationId }).exec((err, chat_messages) => {
  //         if (err) {
  //           io.emit('errorMessage', { message: 'chat_messages not found' });
  //         } else {
  //           if (!chat_messages || chat_messages.length === 0) {
  //             io.emit('action', { type: 'get_messages', data: [] });
  //           } else {
  //             io.emit('action', { type: 'get_messages', data: chat_messages });
  //           }
  //         }
  //       });
  //     } else if (action.type === 'server/newMessage') {
  //       const chat_message_data = action.data.message;
  //       const conversationId = action.data.conversationId;
  //       const chat_message = new ChatMessage({ ...chat_message_data, conversationId });

  //       chat_message.save((err, savedChatMessage) => {
  //         if (err) {
  //           console.log(err);
  //           io.emit('errorMessage', { message: 'Chat not found' });
  //         }

  //         if (!savedChatMessage) {
  //           io.emit('errorMessage', { message: 'chat_message not found' });
  //         } else {
  //           io.emit('action', { type: 'new_message', data: savedChatMessage });

  //           Chat.findOne({ 'id': savedChatMessage.conversationId }).exec((err, chat) => {
  //             if (err) {
  //               io.emit('errorMessage', { message: 'Chat not found' });
  //             } else {
  //               const recipient = chat.participants.find(item => item.id !== savedChatMessage.senderId);
  //               const recipientId = recipient.id;
  //               const recipientSocketId = userSocketMap.get(recipientId);

  //               if (recipientSocketId) {
  //                 // If recipient is connected, emit the 'newMessage' event to the recipient's socket
  //                 io.to(recipientSocketId).emit('newMessage', { senderId, message });
  //               }
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });

  //   // Emit Shopify orders when a client requests them
  //   socket.on('getShopifyOrders', async () => {
  //     try {
  //       // Fetch latest Shopify orders
  //       const orders = await shopify.order.list();

  //       // Update MongoDB database (save or update orders)
  //       await ShopifyOrder.insertMany(orders, { ordered: false, rawResult: true });

  //       // Emit updated Shopify orders to the client
  //       io.emit('shopifyOrders', orders);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

  //   // Emit Shopify products when a client requests them
  //   socket.on('getShopifyProducts', async () => {
  //     try {
  //       // Fetch latest Shopify products
  //       const products = await shopify.product.list();

  //       // Update MongoDB database (save or update products)
  //       await ShopifyProduct.insertMany(products, { ordered: false, rawResult: true });

  //       // Emit updated Shopify products to the client
  //       io.emit('shopifyProducts', products);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });


  //   // CRUD operations
  //   socket.on('createTask', async (taskData) => {
  //     try {
  //       const task = new Task(taskData);
  //       await task.save();
  //       io.emit('taskCreated', task);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

  //   socket.on('getTasks', async () => {
  //     try {
  //       const tasks = await Task.find();
  //       socket.emit('tasks', tasks);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

  //   socket.on('updateTask', async (taskId, updatedData) => {
  //     try {
  //       const task = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
  //       io.emit('taskUpdated', task);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

  //   socket.on('deleteTask', async (taskId) => {
  //     try {
  //       const deletedTask = await Task.findByIdAndDelete(taskId);
  //       io.emit('taskDeleted', deletedTask);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });

    models.forEach(({ name, schema }) => {
      const Model = mongoose.model(name, schema);

      // Socket.IO-specific CRUD operations
      socket.on(`${name.toLowerCase()}-create`, async (data) => {
        try {
          const newEntity = new Model(data);
          const result = await newEntity.save();
          io.emit(`${name.toLowerCase()}-create-response`, result);
        } catch (error) {
          console.error(error.message);
        }
      });

      socket.on(`${name.toLowerCase()}-read`, async () => {
        try {
          const result = await Model.find();
          socket.emit(`${name.toLowerCase()}-read-response`, result);
        } catch (error) {
          console.error(error.message);
        }
      });

      socket.on(`${name.toLowerCase()}-readAll`, async () => {
        try {
          console.log(`${name.toLowerCase()}-readAll`);
          const result = await Model.find();
          socket.emit(`${name.toLowerCase()}-readAll-response`, result);
        } catch (error) {
          console.error(error.message);
        }
      });

      socket.on(`${name.toLowerCase()}-update`, async (data) => {
        try {
          const result = await Model.findByIdAndUpdate(data._id, data, { new: true });
          io.emit(`${name.toLowerCase()}-update-response`, result );
        } catch (error) {
          console.error(error.message);
        }
      });

      socket.on(`${name.toLowerCase()}-delete`, async (id) => {
        try {
          const result = await Model.findByIdAndDelete(id);
          io.emit(`${name.toLowerCase()}-delete-response`, result);
        } catch (error) {
          console.error(error.message);
        }
      });
    });
    socket.setMaxListeners(90);

    socket.on('disconnect', () => {
      // Retrieve the userId associated with the disconnected socket
      const userId = Array.from(userSocketMap.entries()).find(([key, value]) => value === socket.id)?.[0];
  
      // Handle disconnection and use userId if available
      console.log(`${userId}-io-disconnected`);
      
      // Remove the mapping upon disconnection
      userSocketMap.delete(userId);
    });
  });

// Your existing middleware and routing logic...

// Expose io object for use in other parts of your application
module.exports.io = io;

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.keepAliveTimeout = 60 * 1000 + 1000;
app.headersTimeout = 60 * 1000 + 2000;
