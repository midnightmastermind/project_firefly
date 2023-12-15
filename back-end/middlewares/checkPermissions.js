const db = require("../models");
const Permission = db.permission;

// Middleware function to check user permissions
const checkPermission = async (req, res, next) => {
  const userId = req.userId; // Assuming you have the user ID in the request

  try {
    // Fetch user permissions from the database
    const userPermissions = await Permission.find({ userId });

    // Add user permissions to the request object
    req.userPermissions = userPermissions;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error("Error checking user permissions:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = checkPermission;
