const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require('path');
const app = express();

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
    if (req.get('Referrer') ) {
      res.setHeader('Access-Control-Allow-Origin', req.get('Referrer'))
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    }
    next();
  })
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

require("./packages/site/routes/user_site_availability.routes")(app);
require("./packages/site/routes/site_product_availability.routes")(app);
require("./packages/site_builder/routes/page.routes")(app);
require("./packages/site/routes/content.routes")(app);

require("./packages/blog/routes/post.routes")(app);

require("./packages/storage/routes/file.routes")(app);
require("./packages/storage/routes/folder.routes")(app);

require("./packages/scheduling/routes/session.routes")(app);
require("./packages/scheduling/routes/enrollment.routes")(app);
require("./packages/scheduling/routes/attendance.routes")(app);

require("./packages/ecommerce/routes/transaction.routes")(app);
require("./packages/ecommerce/routes/product_permissions.routes")(app);
require("./packages/ecommerce/routes/product.routes")(app);
require("./packages/ecommerce/routes/cart_item.routes")(app);
require("./packages/ecommerce/routes/stripe.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.keepAliveTimeout = (60 * 1000) + 1000;
app.headersTimeout = (60 * 1000) + 2000;




