// middlewares/authenticate.js
const jwt = require("jsonwebtoken");
const User = require("../models/authentication/user");
const bcrypt = require('bcrypt');
 
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
 
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }
 
    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
 
module.exports = authenticate;