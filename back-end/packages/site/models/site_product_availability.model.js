const mongoose = require("mongoose");

const Site_Product_Availability = mongoose.model(
    "Site_Product_Availability",
    new mongoose.Schema({
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Site_Product_Availability;