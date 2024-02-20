const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const Site_Permissions = db.site_permissions;
const Global_Permissions = db.global_permissions;
const User = db.user;
const Role = db.role;
const Site = db.site;
const siteHelper = require("../helper/site.js");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isSiteAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        const site_name = siteHelper.getSiteName(req);

        Site.findOne({
            domain: site_name
        }).exec((err, site) => {
            if (err) {
                return err;
            }

            Site_Permissions.findOne({ user_id: user._id, site_id: site._id }).exec((err, site_permissions) => {
                Global_Permissions.findOne({ user_id: user._id }).exec((err, global_permissions) => {
                    if (err) {
                        return err;
                    }

                    let all_roles = [];

                    if (site_permissions) {
                        all_roles = all_roles.concat(site_permissions.roles);
                    }

                    if (global_permissions) {
                        all_roles = all_roles.concat(global_permissions.roles);
                    }

                    Role.find(
                        {
                            _id: { $in: all_roles }
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "admin" || roles[i].name === "global_admin") {
                                    next();
                                    return;
                                }
                            }

                            res.status(403).send({ message: "Require Admin Role!" });
                            return;
                        }
                    );
                });
            });
        });
    });
};

const isSuperUser = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        const site_name = siteHelper.getSiteName(req);

        Site.findOne({
            domain: site_name
        }).exec((err, site) => {
            if (err) {
                return err;
            }
            Site_Permissions.findOne({ user_id: user._id, site_id: site._id }).exec((err, site_permissions) => {
                Global_Permissions.findOne({ user_id: user._id }).exec((err, global_permissions) => {
                    if (err) {
                        return err;
                    }

                    let all_roles = [];

                    if (site_permissions) {
                        all_roles = all_roles.concat(site_permissions.roles);
                    }

                    if (global_permissions) {
                        all_roles = all_roles.concat(global_permissions.roles);
                    }

                    Role.find(
                        {
                            _id: { $in: all_roles }
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "superUser" || roles[i].name === "admin" || roles[i].name === "global_admin") {
                                    next();
                                    return;
                                }
                            }

                            res.status(403).send({ message: "Require SuperUser Role!" });
                            return;
                        }
                    );
                });
            });
        });
    });
};

const isGlobalAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        const site_name = siteHelper.getSiteName(req);

        Site.findOne({
            domain: site_name
        }).exec((err, site) => {
            if (err) {
                return err;
            }

            Site_Permissions.findOne({ user_id: user._id, site_id: site._id }).exec((err, site_permissions) => {
                Global_Permissions.findOne({ user_id: user._id }).exec((err, global_permissions) => {
                    if (err) {
                        return err;
                    }

                    let all_roles = [];

                    if (site_permissions) {
                        all_roles = all_roles.concat(site_permissions.roles);
                    }

                    if (global_permissions) {
                        all_roles = all_roles.concat(global_permissions.roles);
                    }

                    Role.find(
                        {
                            _id: { $in: all_roles }
                        },
                        (err, roles) => {

                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "global_admin") {
                                    next();
                                    return;
                                }
                            }

                            res.status(403).send({ message: "Require Global Admin Role!" });
                            return;
                        }
                    );
                });
            });
        });
    });
};

const authJwt = {
    verifyToken,
    isSiteAdmin,
    isSuperUser,
    isGlobalAdmin
};
module.exports = authJwt;
