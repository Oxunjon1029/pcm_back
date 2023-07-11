// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const bcrypt = require('bcrypt');
// Configure the local strategy for passport
passport.use(new LocalStrategy(
  async function (email, password, done) {
    // You need to implement your own logic to validate the user's credentials
    await User.findOne({ email: email }, async function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!(await bcrypt.compareSync(password, user?.hash_password))) { return done(null, false); }
      return done(null, user);
    });
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
