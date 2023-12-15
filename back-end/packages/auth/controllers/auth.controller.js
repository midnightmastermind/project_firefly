/**
 * This code is the signin function for a user.
 * It finds the user by their username and checks if the password is valid.
 * If it is, it creates a token and sends back the user information.
 */
const config = require("../../../config/auth.config");
const db = require("../../../models");
const { clientIds } = require("../../../config/clientIds.js");
const User = db.user;
const Role = db.role;
const Site = db.site;
const Site_Permissions = db.site_permissions;
const Global_Permissions = db.global_permissions;
const User_Site_Availability = db.user_site_availability;
const { google } = require("googleapis");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const siteHelper = require("../../../helper/site");
const jwt_decode = require("jwt-decode");
const fetch = require("node-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");
const microsoft_scopes = ["https://graph.microsoft.com/.default"];
const redirectUri = 'http://localhost:8080/api/auth/handle-microsoft-redirect';
const { PublicClientApplication, ConfidentialClientApplication } = require("@azure/msal-node");


const msal = require('@azure/msal-node');

const msalInstance = new msal.ConfidentialClientApplication({
    auth: {
        clientId: clientIds.microsoft.clientId,
        authority: `https://login.microsoftonline.com/${clientIds.microsoft.tenantId}`,
        clientSecret: clientIds.microsoft.clientSecret,
        redirectUri
    },
    system: {
        loggerOptions: {
            loggerCallback: (loglevel, message, containsPii) => {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
});


const oauth2Client = new google.auth.OAuth2(
    clientIds.google.clientId,
    clientIds.google.clientSecret,
    `http://localhost:8080/api/auth/handleGoogleRedirect` // server redirect url handler
);


exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
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


            const new_site_product_availability = new User_Site_Availability({
                user_id: user._id,
                site_id: site._id,
            });
            new_site_product_availability.save((err, site_permissions) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                let token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                res.status(200).send({
                    id: user._id,
                    username: user.email,
                    email: user.email,
                    accessToken: token,
                    roles: []
                });
            });
        })
    });
};


exports.signin = (req, res) => {

    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }


            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            const site_name = siteHelper.getSiteName(req);
            Site.findOne({
                domain: site_name
            }).exec((err, site) => {
                if (err) {
                    return err;
                }
                User_Site_Availability.findOne({ user_id: user._id, site_id: site._id })
                    .exec((err, user_site_availability) => {
                        if (err || !user_site_availability) {
                            res.status(403).send({ message: "You do not have access to this site" });
                            return;
                        }

                        Site_Permissions.findOne({ user_id: user._id, site_id: site._id })
                            .populate("roles", "-__v")
                            .exec((err, site_permissions) => {
                                if (err) {
                                    return err;
                                }

                                Global_Permissions.findOne({ user_id: user._id })
                                    .populate("roles", "-__v")
                                    .exec((err, global_permissions) => {
                                        if (err) {
                                            return err;
                                        }
                                        let all_permissions = [];
                                        if (site_permissions) {
                                            all_permissions = all_permissions.concat(site_permissions.roles)
                                        }

                                        if (global_permissions) {
                                            all_permissions = all_permissions.concat(global_permissions.roles);
                                        }

                                        if (!all_permissions) {
                                            return res.status(403).send({
                                                message: "You do not have access to this site"
                                            });

                                        }
                                        var authorities = [];
                                        for (let i = 0; i < all_permissions.length; i++) {
                                            authorities.push("ROLE_" + all_permissions[i].name.toUpperCase());
                                        }

                                        res.status(200).send({
                                            id: user._id,
                                            username: user.username,
                                            email: user.email,
                                            accessToken: token,
                                            roles: authorities
                                        });
                                    });
                            });
                    });
            });
        });
};


exports.oAuthSignup = (req, res) => {
    let token = req.body.credential;
    let type = req.body.type;
    let userInfo = {};


    if (type == 'google') {


        oauth2Client.setCredentials({ access_token: token });
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            function (err, userdata) {
                userInfo.email = userdata.data.email,
                    userInfo.username = userInfo.email;
                if (err) {
                    console.log(err);
                } else {
                    // Email
                    User.findOne({
                        email: userdata.data.email
                    }).exec((err, user) => {
                        if (user) {
                            res.status(400).send({ message: "Failed! Email is already in use!" });
                            return;
                        }

                        const newUser = new User({
                            ...userInfo
                        });
                        newUser.save((err, savedUser) => {
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

                                const new_site_product_availability = new User_Site_Availability({
                                    user_id: savedUser._id,
                                    site_id: site._id,
                                });
                                new_site_product_availability.save((err, user_site_availability) => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    let user_token = jwt.sign({ id: savedUser._id }, config.secret, {
                                        expiresIn: 86400 // 24 hours
                                    });
                                    res.status(200).send({
                                        id: savedUser._id,
                                        username: savedUser.email,
                                        email: savedUser.email,
                                        accessToken: user_token,
                                        roles: []
                                    });
                                });
                            })
                        });
                    });
                }
            });
    } else if (type == 'microsoft') {
        var decoded = jwt_decode(token);
        userInfo.username = decoded.unique_name,
        userInfo.email = decoded.unique_name;
        userInfo.first_name = decoded.given_name;
        userInfo.last_name = decoded.family_name;

        // Email
        User.findOne({
            email: userInfo.email
        }).exec((err, user) => {
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            const newUser = new User({
                ...userInfo
            });
            newUser.save((err, savedUser) => {
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

                    const new_site_product_availability = new User_Site_Availability({
                        user_id: savedUser._id,
                        site_id: site._id,
                    });
                    new_site_product_availability.save((err, user_site_availability) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        let user_token = jwt.sign({ id: savedUser._id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                        });
                        res.status(200).send({
                            id: savedUser._id,
                            username: savedUser.email,
                            email: savedUser.email,
                            accessToken: user_token,
                            roles: []
                        });
                    });
                })
            });
        });
    }
};

exports.oAuthSignin = (req, res) => {
    const token = req.body.credential;
    const type = req.body.type;
    let userInfo = {};

    if (type == 'google') {
        oauth2Client.setCredentials({ access_token: token });
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            function (err, userdata) {
                if (err) {
                    console.log(err);
                } else {
                    User.findOne({
                        email: userdata.data.email
                    })
                        .exec((err, user) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            if (!user) {
                                return res.status(404).send({ message: "User Not found." });
                            }

                            const site_name = siteHelper.getSiteName(req);

                            let user_token = jwt.sign({ id: user._id }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            });
                            Site.findOne({
                                domain: site_name
                            }).exec((err, site) => {
                                if (err) {
                                    return err;
                                }
                                User_Site_Availability.findOne({ user_id: user._id, site_id: site._id })
                                    .exec((err, user_site_availability) => {
                                        if (err || !user_site_availability) {
                                            res.status(403).send({ message: "You do not have access to this site" });
                                            return;
                                        }

                                        Site_Permissions.findOne({ user_id: user._id, site_id: site._id })
                                            .populate("roles", "-__v")
                                            .exec((err, site_permissions) => {
                                                if (err) {
                                                    return err;
                                                }

                                                Global_Permissions.findOne({ user_id: user._id })
                                                    .populate("roles", "-__v")
                                                    .exec((err, global_permissions) => {
                                                        if (err) {
                                                            return err;
                                                        }
                                                        let all_permissions = [];
                                                        if (site_permissions) {
                                                            all_permissions = all_permissions.concat(site_permissions.roles)
                                                        }

                                                        if (global_permissions) {
                                                            all_permissions = all_permissions.concat(global_permissions.roles);
                                                        }

                                                        if (!all_permissions) {
                                                            return res.status(403).send({
                                                                message: "You do not have access to this site"
                                                            });

                                                        }
                                                        var authorities = [];
                                                        for (let i = 0; i < all_permissions.length; i++) {
                                                            authorities.push("ROLE_" + all_permissions[i].name.toUpperCase());
                                                        }


                                                        res.status(200).send({
                                                            id: user._id,
                                                            username: user.username,
                                                            email: user.email,
                                                            accessToken: user_token,
                                                            roles: authorities
                                                        });
                                                    });
                                            });
                                    });
                            });
                        });
                }
            });
    } else if (type == 'microsoft') {
        let decoded = jwt_decode(token);
        userInfo.username = decoded.unique_name,
            userInfo.email = decoded.unique_name;
        userInfo.first_name = decoded.given_name;
        userInfo.last_name = decoded.family_name;

        User.findOne({
            email: userInfo.username
        })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                const site_name = siteHelper.getSiteName(req);

                let user_token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                Site.findOne({
                    domain: site_name
                }).exec((err, site) => {
                    if (err) {
                        return err;
                    }
                    User_Site_Availability.findOne({ user_id: user._id, site_id: site._id })
                        .exec((err, user_site_availability) => {
                            if (err || !user_site_availability) {
                                res.status(403).send({ message: "You do not have access to this site" });
                                return;
                            }

                            Site_Permissions.findOne({ user_id: user._id, site_id: site._id })
                                .populate("roles", "-__v")
                                .exec((err, site_permissions) => {
                                    if (err) {
                                        return err;
                                    }

                                    Global_Permissions.findOne({ user_id: user._id })
                                        .populate("roles", "-__v")
                                        .exec((err, global_permissions) => {
                                            if (err) {
                                                return err;
                                            }
                                            let all_permissions = [];
                                            if (site_permissions) {
                                                all_permissions = all_permissions.concat(site_permissions.roles)
                                            }

                                            if (global_permissions) {
                                                all_permissions = all_permissions.concat(global_permissions.roles);
                                            }

                                            if (!all_permissions) {
                                                return res.status(403).send({
                                                    message: "You do not have access to this site"
                                                });

                                            }
                                            var authorities = [];
                                            for (let i = 0; i < all_permissions.length; i++) {
                                                authorities.push("ROLE_" + all_permissions[i].name.toUpperCase());
                                            }


                                            res.status(200).send({
                                                id: user._id,
                                                username: user.username,
                                                email: user.email,
                                                accessToken: user_token,
                                                roles: authorities
                                            });
                                        });
                                });
                        });
                });
            });
    }

};


exports.createLink = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            //calendar api scopes]
            "https://www.googleapis.com/auth/calendar",
        ],
        prompt: "consent",
    });
    res.send({ url });
};

exports.createMicrosoftLink = (req, res) => {
    const authCodeUrlParameters = {
        scopes: microsoft_scopes,
        redirectUri,
        clientId: clientIds.microsoft.clientId,
        clientSecret: clientIds.microsoft.clientSecret
    };

    msalInstance.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        console.log(response);
        res.send(response);
    });
};

exports.handleMicrosoftRedirect = async (req, res) => {
    const tokenRequest = {
        // The URL from the redirect will contain the Auth Code in the query parameters
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri,
    };

    // Pass the tokenRequest object with the Auth Code, scopes and redirectUri to acquireTokenByCode API
    msalInstance.acquireTokenByCode(tokenRequest).then((response) => {
        console.log(response);
        User.findOne({
            email: response.account.username
        })
            .exec((err, user) => {
                if (err || !user) {
                    res.redirect(
                        `http://localhost:8081/register?microsoftAccessToken=${response.accessToken}`
                    );
                }

                res.redirect(
                    `http://localhost:8081/login?microsoftAccessToken=${response.accessToken}`
                );

            });
    }).catch ((error) => {
    console.log(error);
    res.status(500).send(error);
});
    // const tokenRequest = {
    //     code: req.query.code,
    //     scopes: microsoft_scopes,
    //     redirectUri,
    //     clientId: clientIds.microsoft.clientId,
    //     clientSecret: clientIds.microsoft.clientSecret
    // };

    // console.log("hit2");
    // pca.acquireTokenByCode(tokenRequest).then((response) => {
    //     console.log("hit3");
    //     // Store the user-specific access token in the session for future use
    //     userAccessToken = response.accessToken;

    //     // Initialize the Microsoft Graph API client using the user access token
    //     const client = Client.init({
    //         authProvider: (done) => {
    //             done(null, userAccessToken);
    //         },
    //     });

    //     // Fetch the user's emails using the Microsoft Graph API
    //     client.api("/me").get(
    //         function (err, userdata) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 User.findOne({
    //                     email: userdata.data.email
    //                 })
    //                     .exec((err, user) => {
    //                         if (err || !user) {
    //                             res.redirect(
    //                                 `http://localhost:8081/register?accessToken=${accessToken}&refreshToken=${refreshToken}`
    //                             );
    //                         }

    //                         res.redirect(
    //                             `http://localhost:8081/login?accessToken=${accessToken}&refreshToken=${refreshToken}`
    //                         );

    //                     });
    //             }
    //         });
    // }).catch((error) => {
    //     console.log(error);
    //     res.status(500).send(error);
    // });

};

exports.handleGoogleRedirect = async (req, res) => {

    // get code from url
    const code = req.query.code;
    console.log(code);
    console.log("server 36 | code", code);
    // get access token
    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.log("server 39 | error", err);
            throw new Error("Issue with Login", err.message);
        }
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;


        oauth2Client.setCredentials({ access_token: accessToken });
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            function (err, userdata) {
                if (err) {
                    console.log(err);
                } else {
                    User.findOne({
                        email: userdata.data.email
                    })
                        .exec((err, user) => {
                            if (err || !user) {
                                res.redirect(
                                    `http://localhost:8081/register?accessToken=${accessToken}&refreshToken=${refreshToken}`
                                );
                            }

                            res.redirect(
                                `http://localhost:8081/login?accessToken=${accessToken}&refreshToken=${refreshToken}`
                            );

                        });
                }
            });
    });
};

exports.getValidToken = async (req, res) => {
    try {
        const request = await fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: clientIds.google.clientId,
                client_secret: clientIds.google.clientSecret,
                refresh_token: req.body.refreshToken,
                grant_type: "refresh_token",
            }),
        });

        const data = await request.json();
        console.log("server 74 | data", data.access_token);

        res.json({
            accessToken: data.access_token,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.getValidMicrosoftToken = async (req, res) => {
    try {
        const tokenRequest = {
            microsoft_scopes,
            clientSecret: clientIds.microsoft.clientSecret,
        };

        const response = await cca.acquireTokenByClientCredential(tokenRequest);
        const accessToken = response.accessToken;

        // Store the client-specific access token in the session for future use
        res.json({
            accessToken: data.access_token,
        });
    } catch (error) {
        res.status(500).send(error);
        console.log("Error acquiring access token:", error.message);
    }
};
