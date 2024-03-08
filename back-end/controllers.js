// Define your models
const models = [
    { name: 'User', schema: userSchema },
    { name: 'Post', schema: postSchema },
    // Add more models as needed
  ];
  
  // HTTP CRUD Operations
  models.forEach(model => {
    const { name, schema } = model;
    const Model = mongoose.model(name, schema);
  
    // Create
    app.post(`/${name.toLowerCase()}`, async (req, res) => {
      try {
        const newEntity = new Model(req.body);
        const result = await newEntity.save();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  
    // Read All
    app.get(`/${name.toLowerCase()}`, async (req, res) => {
      try {
        const entities = await Model.find();
        res.json(entities);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  
  // Update
  app.put(`/${name.toLowerCase()}/:id`, async (req, res) => {
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
  app.delete(`/${name.toLowerCase()}/:id`, async (req, res) => {
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
  
  // Socket.IO Event Handling
  models.forEach(model => {
    const { name } = model;
  
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
  
      // Socket.IO-specific CRUD operations
      socket.on(`crud-${name.toLowerCase()}-create`, async (data) => {
        try {
          const newEntity = new Model(data);
          const result = await newEntity.save();
          io.emit(`crud-${name.toLowerCase()}`, { action: 'create', data: result });
        } catch (error) {
          console.error(error.message);
        }
      });
  
      socket.on(`crud-${name.toLowerCase()}-read`, async () => {
        try {
          const entities = await Model.find();
          socket.emit(`crud-${name.toLowerCase()}`, { action: 'read', data: entities });
        } catch (error) {
          console.error(error.message);
        }
      });
  
      socket.on(`crud-${name.toLowerCase()}-update`, async (data) => {
        try {
          const updatedEntity = await mongoose.model(name).findByIdAndUpdate(data._id, data, { new: true });
          io.emit(`crud-${name.toLowerCase()}`, { action: 'update', data: updatedEntity });
        } catch (error) {
          console.error(error.message);
        }
      });
  
      socket.on(`crud-${name.toLowerCase()}-delete`, async (id) => {
        try {
          const deletedEntity = await mongoose.model(name).findByIdAndDelete(id);
          io.emit(`crud-${name.toLowerCase()}`, { action: 'delete', data: deletedEntity });
        } catch (error) {
          console.error(error.message);
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
        // Remove the disconnected socket from the connectedSockets object
        delete connectedSockets[socket.id];
      });
    
      // Store the connected socket in the connectedSockets object
      connectedSockets[socket.id] = socket;
    });
  });
  
  // Fallback HTTP route
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
  
  