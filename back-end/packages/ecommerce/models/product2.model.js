const mongoose = require('mongoose');
const { Types } = mongoose;
// const Grid = require('gridfs-stream');

// const conn = mongoose.createConnection('mongodb://localhost/my_database'); // Replace with your MongoDB connection string

// let gfs;
// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('photos'); // Set the collection name
// });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: String,
  status: { type: String, enum: ['publish', 'not'], default: 'publish' },
  price: { type: Number, required: true },
  tax: { type: Number, required: true },
  description: String,
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
  },
  photo: { type: Types.ObjectId, ref: 'Photo' }, // Use ObjectId reference
  // Add more fields as needed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;