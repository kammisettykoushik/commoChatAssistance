const express = require("express");
const passport = require("../../config/passport");
const jwt = require("jsonwebtoken");
// const session = require('express-session');
const router = express.Router();
require("dotenv").config();

// Initial Facebook authentication route
router.get("/authentication/facebook", 
  passport.authenticate("facebook", { 
    scope: ["email", "public_profile"] 
  })
);

// Facebook callback route
router.get("/authentication/facebook/callback",
  (req, res, next) => {
    console.log("Facebook callback reached");
    next();
  },
  passport.authenticate("facebook", { 
    failureRedirect: "/login",
    failureMessage: true 
  }),
  (req, res) => {
    try {
      console.log("User from request:", req.user);
      if (!req.user) {
        console.log("No user found in request");
        return res.status(401).json({ error: "Authentication failed" });
      }

      const token = jwt.sign({
        id: req.user.id,
        email: req.user.email || "",
        provider: "facebook"
      }, process.env.JWT_SECRET, { 
        expiresIn: "1h" 
      });

      res.redirect(`${process.env.CLIENT_DOMAIN}/login?token=${token}&provider=facebook`);
    } catch (error) {
      console.error("Facebook callback error:", error);
      res.redirect(`${process.env.CLIENT_DOMAIN}/login?error=authentication_failed`);
    }
  }
);

module.exports = router;