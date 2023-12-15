const url = require("node:url");

const filterFromList = (objects, list, object_type_name) => {
    if(Array.isArray(objects)) {
        objects = objects.filter(object => {
            if(list.filter(list_item => list_item[object_type_name].toString() === object._id.toString())) {
                return object;
            }
        });
    } else {
        if(!list.includes(objects._id)) {
            objects = null;
        }
    }

    return objects;
};

const getSiteName = (req) => {
    let site_url = req.get('referer');
    let site_array = url.parse(site_url);
    let site_name = site_array['hostname'].split(".")[0];
    if (site_name == "localhost") {
        site_name = "main"
    }
    return site_name;
}

const siteHelper = {
    filterFromList,
    getSiteName
};

module.exports = siteHelper;