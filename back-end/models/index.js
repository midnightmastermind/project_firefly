const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//auth models
db.global_permissions = require("../packages/auth/models/global_permissions.model");
db.role = require("../packages/auth/models/role.model");
db.site_permissions = require("../packages/auth/models/site_permissions.model");
db.user = require("../packages/auth/models/user.model");

//blog models
db.post = require("../packages/blog/models/post.model");
db.post_category = require("../packages/blog/models/post_category.model");


//ecommerce models
db.product = require("../packages/ecommerce/models/product.model");
db.product_permissions = require("../packages/ecommerce/models/product_permissions.model");
db.transaction = require("../packages/ecommerce/models/transaction.model");
db.purchase = require("../packages/ecommerce/models/purchase.model");
db.commerce_category = require("../packages/ecommerce/models/commerce_category.model");
db.shipment = require("../packages/ecommerce/models/shipment.model");
db.variation = require("../packages/ecommerce/models/variation.model");
db.service = require("../packages/ecommerce/models/service.model");

//scheduling models
db.attendance = require("../packages/scheduling/models/attendance.model");
db.enrollment = require("../packages/scheduling/models/enrollment.model");
db.session = require("../packages/scheduling/models/session.model");
db.event = require("../packages/scheduling/models/event.model");
db.booking = require("../packages/scheduling/models/booking.model");

//site models
db.content = require("../packages/site/models/content.model");
db.form = require("../packages/site/models/form.model");
db.grouping = require("../packages/site/models/grouping.model");
db.option = require("../packages/site/models/option.model");
db.question = require("../packages/site/models/question.model");
db.site = require("../packages/site/models/site.model");
db.site_product_availability = require("../packages/site/models/site_product_availability.model");
db.user_form_response = require("../packages/site/models/user_form_response.model");
db.user_site_availability = require("../packages/site/models/user_site_availability.model");
db.permission = require("../packages/site/models/permission.model");
db.navigation = require("../packages/site/models/navigation.model");
db.theme = require("../packages/site/models/theme.model");
db.style = require("../packages/site/models/style.model");

//storage models
db.file = require("../packages/storage/models/file.model");
db.folder = require("../packages/storage/models/folder.model");

//site_builder models
db.site_object = require("../packages/site_builder/models/site_object.model");
db.page = require("../packages/site_builder/models/page.model");

module.exports = db;