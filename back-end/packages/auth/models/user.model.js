const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        first_name: String,
        last_name: String,
        address: String,
        state: String,
        country: String,
        zip: String,
        profile_image: String,
        login_type: String
        /*
            Student: relationship to user as an enrolled person
            /????: productAdmin: has control over a product, one or more permissions on a product
    
        */
    })
);

module.exports = User;
