/**
 * This code is creating a new product, with the title, description, product image, and published status coming from the req.body.
 * It is also creating a new product_permissions entry, with the user_id and product_id coming from req.body and the permissions set to "owner".
 */

const db = require("../../../models");
const siteHelper = require("../../../helper/site");
const Site_Product_Availability = db.site_product_availability;
const Product_Permissions = db.product_permissions;
const Site = db.site;
const Product = db.product;

exports.createProduct = (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({ domain: site_name }).exec((err, site) => {

        const product = new Product({
            ...req.body,
            published: false
        });

        product.save((err, product) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            const site_product_availability = new Site_Product_Availability({
                site_id: site._id,
                product_id: product.id
            });

            site_product_availability.save((err, site) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                const product_permissions = new Product_Permissions({
                    user_id: req.body.user_id,
                    product_id: product._id,
                    permissions: "owner"
                });

                product_permissions.save((err, product_permission) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.status(200).send(product);
                });
            });
        });
    });
};

exports.getProducts = async (req, res) => {
    Product.find()
    .exec((err, products) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!products) {
            return res.status(404).send({ message: "Products Not found." });
        }

        res.status(200).send(products);
    });
};

exports.getProductsForSite = async (req, res) => {
    const site_name = siteHelper.getSiteName(req);

    Site.findOne({ domain: site_name }).exec((err, site) => {
        if (err || !site) {
            return res.status(404).send({ message: "Site not found." });
        }
        Site_Product_Availability.find({ site_id: site._id })
            .select('product_id -_id')
            .exec((err, site_product_availability) => {
                Product.find().exec((err, products) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    
                    products = siteHelper.filterFromList(products, site_product_availability, 'product_id');

                    if (!products) {
                        return res.status(404).send({ message: "Products Not found." });
                    }

                    res.status(200).send(products);
                });
            });
    });
};

exports.updateProduct = (req, res) => {
    const product_updates = {
        title: req.body.title,
        description: req.body.description,
        product_image: req.body.product_image,
        published: req.body.published
    };

    Product.findOneAndUpdate({ _id: req.params.id }, product_updates, { new: true })
        .exec((err, product) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!product) {
                return res.status(404).send({ message: "Product Not found." });
            }

            res.status(200).send(product);
        });
};

