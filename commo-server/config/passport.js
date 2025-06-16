const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/authentication/user"); 
require('dotenv').config();

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/authentication/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      const email = profile.emails?.[0]?.value || `google-${profile.id}@placeholder.com`;
      const firstName = profile.name?.givenName || '';
      const lastName = profile.name?.familyName || '';

      user = await User.create({
        googleId: profile.id,
        email,
        firstName,
        lastName
      });
    }

    done(null, user);
  } catch (error) {
    console.error("Google strategy error:", error);
    done(error, null);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: 'https://trishokaconnect.com/api/authentication/facebook/callback',
  profileFields: ['id', 'emails', 'name'],
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Facebook profile:', profile);

    const email = profile.emails?.[0]?.value || `fb-${profile.id}@placeholder.com`;
    const firstName = profile.name?.givenName || '';
    const lastName = profile.name?.familyName || '';

    let user = await User.findOne({ where: { facebookId: profile.id } });

    if (!user) {
      user = await User.create({
        facebookId: profile.id,
        email,
        firstName,
        lastName
      });
    }

    return done(null, user);
  } catch (error) {
    console.error('Facebook strategy error:', error);
    return done(error, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
