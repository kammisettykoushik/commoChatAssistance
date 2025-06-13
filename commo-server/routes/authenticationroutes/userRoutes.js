const express = require("express");

const nodemailer = require("nodemailer"); // Add nodemailer for sending emails
const crypto = require("crypto"); // For generating reset tokens
const { Op } = require("sequelize"); // For Sequelize queries

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../../models/authentication/user"); // Ensure correct path
// const slugify = require('slugify');
const passport = require("../../config/passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');

const router = express.Router();

dotenv.config();

// const app = express();
// app.use(cors({ origin: '${process.env.CLIENT_DOMAIN}', credentials: true }));
// app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Mock user database
// const users = [];

// // Configure Passport.js
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
// },
// (accessToken, refreshToken, profile, done) => {
//   // Check if user exists in your DB
//   let user = users.find(u => u.id === profile.id);
//   if (!user) {
//     user = { id: profile.id, displayName: profile.displayName, emails: profile.emails };
//     users.push(user);
//   }
//   return done(null, user);
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// // Routes
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, generate JWT
//     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     // Redirect to frontend with token
//     res.redirect(`${process.env.CLIENT_DOMAIN}?token=${token}`);
//   }
// );


// Forgot Password Endpoint
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist." });
    }

    // Generate a reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save the reset token and expiry to the user record
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create a reset link
    // const resetLink = `${process.env.CLIENT_DOMAIN}/reset-password/${resetToken}`;
    const resetLink = `${process.env.CLIENT_DOMAIN}/ResetPassword/${resetToken}`;


    // Send the reset link via email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Failed to send password reset email." });
  }
});

// Helper function to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
};





// User Registration (Sign Up)
router.post("/", async (req, res) => {
  // console.log("User Registration Route Hit");
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate slug from firstName + lastName
    const baseSlug = slugify(`${firstName} ${lastName}`);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await User.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      slug,
    });
    
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});


// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by slug
router.get("/:slug", async (req, res) => {
  try {
    const user = await User.findOne({ where: { slug: req.params.slug } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by slug:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Password Reset Endpoint
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and new password are required." });
    }

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() }, // token not expired
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Server error while resetting password." });
  }
});


// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }), 
//   (req, res) => {
//     // Send token to frontend or redirect
//     const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.redirect(`${process.env.CLIENT_DOMAIN}?token=${token}`); // or send token in JSON
//   }
// );

router.get("/authentication/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
    session: false
  })
);

router.get("/authentication/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login"
  }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const token = jwt.sign({
        id: req.user.id,
        email: req.user.email || "",
        provider: "facebook"
      }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.redirect(`${process.env.CLIENT_DOMAIN}/?token=${token}&provider=facebook`);
    } catch (error) {
      console.error("Facebook callback error:", error);
      res.redirect(`${process.env.CLIENT_DOMAIN}/LoginScreen?error=authentication_failed`);
    }
  }
);


module.exports = router;