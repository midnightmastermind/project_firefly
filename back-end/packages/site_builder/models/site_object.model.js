const mongoose = require("mongoose");
const { Schema } = mongoose;



const SiteObjects = mongoose.model(
    "Site_Object",
    new mongoose.Schema({
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    id: String,
    type: String, //Page, Row, Column, Component
    object_properties: Object,
    children: [this],
    status: String,
    createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    }).set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret.__v;
    }})
);


module.exports = SiteObjects;
