const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const GOOGLE_CALLBACK_URL = 'https://pcmback-production.up.railway.app/api/v1/auth/google/callback'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  async (req, accessToken, refreshToken, profile, cb) => {
    const defaultUser = {
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      email: profile.emails[0].value,
      googleId: profile.id
    }

    try {
      let user = await User.findOne({ googleId: profile.id });
      jwt.sign({ user }, process.env.COOKIE_SECRET)
      if (user) {
        req.user = user
        return cb(null, user);
      } else {
        newUser = await User.create(defaultUser);
        jwt.sign({ user }, process.env.COOKIE_SECRET)
        console.log(newUser)
        return cb(null, newUser);
      }
    } catch (err) {
      return cb(err, null);
    }
  }))


passport.serializeUser((user, cb) => {
  console.log('Serializing user', user);
  cb(null, user);
});


passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ _id: id });
    console.log('desirilized user:', user)
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
});
