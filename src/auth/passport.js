// passport.js

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const bcrypt = require('bcrypt');
// Configure the local strategy for passport
passport.use(new JwtStrategy(
  async function (email, password, done) {
    // You need to implement your own logic to validate the user's credentials
    await User.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          if (await bcrypt.compare(password, user?.hash_password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err);
      });;
  }
));

// Serialize and deserialize user sessions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
