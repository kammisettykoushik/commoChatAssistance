const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/authentication/user"); 
require('dotenv').config();

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Replace this with your DB logic
  done(null, profile);
}));


passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: `${process.env.CLIENT_DOMAIN}/api/authentication/facebook/callback`,
    profileFields: ['id', 'emails', 'name'],
    // enableProof: true
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      // Log the profile for debugging
      console.log('Facebook profile:', profile);

      let user = await User.findOne({ where: { facebookId: profile.id } });
      
      if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails?.[0]?.value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
          // provider: 'facebook'
        });
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Facebook strategy error:', error);
      return done(error, null);
    }
  }
));

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
