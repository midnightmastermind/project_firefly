const mongoose = require('mongoose');
const { Schema } = mongoose;

const componentsStyleSchema = new Schema({
  backgroundColor: String,
  color: String,
  fontSize: String,
  padding: String,
  margin: String,
  border: String,
  additionalStyles: String
});

const layoutSchema = new Schema({
  x: Number,
  y: Number,
  width: String,
  height: String,
  flex: String,
  gridArea: String,
  additionalLayout: String
});

const componentParametersSchema = new Schema({
  buttonType: String,
  text: String,
  cardTitle: String,
  cardContent: String,
  placeholder: String,
  styles: componentsStyleSchema,
  layout: layoutSchema
});

const pageObjectSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  componentParameters: componentParametersSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  children: [pageObjectSchema],
  layout: layoutSchema,
  style: componentsStyleSchema,
});

const pageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  children: [pageObjectSchema],
  layout: layoutSchema,
  style: componentsStyleSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
