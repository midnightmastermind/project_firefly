/**
 * This code contains the CRUD operations for site_object.
 */
  
  const db = require("../../../models");
  const SiteObject = db.site_object;
  
  exports.createSiteObject = (req, res) => {
      const new_site_object = new SiteObject({
          ...req.body
      });
      
      console.log(new_site_object);
      new_site_object.save((err, site_object) => {
        console.log(site_object);
        console.log(err);
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
          res.status(200).send(site_object);
      });
  };
  
  exports.getSiteObjects = (req, res) => {
      SiteObject.find()
      .exec((err, site_objects) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
  
          if (!site_objects) {
              return res.status(404).send({ message: "SiteObject Not found." });
          }
  
          res.status(200).send(site_objects);
      });
  };
  
  exports.getSiteObjectById = (req, res) => {
      SiteObject.findOne({_id: req.body.site_object_id})
      .exec((err, site_object) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
  
          if (!site_object) {
              return res.status(404).send({ message: "SiteObject Not found." });
          }
          site_object.id = site_object._id;
          res.status(200).send(site_object);
      });
  };
  
  exports.updateSiteObject = (req, res) => {
      const site_object_updates = {
          ...req.body
      };
  
      SiteObject.findOneAndUpdate({ _id: req.params.id }, site_object_updates, { new: true })
          .exec((err, site_object) => {
              if (err) {
                  res.status(500).send({ message: err });
                  return;
              }
  
              if (!site_object) {
                  return res.status(404).send({ message: "SiteObject Not found." });
              }
  
              res.status(200).send(site_object);
          });
  };