// // passport.js

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/users');
// const bcrypt = require('bcrypt');
// // Configure the local strategy for passport
// passport.use(new LocalStrategy(
//   async function (payload, done) {
//     // You need to implement your own logic to validate the user's credentials
//     const { email, password } = payload
//     console.log(payload)
//     return await User.findOne({ email: email })
//       .then(async (user) => {
//         if (user) {
//           if (await bcrypt.compare(password, user?.hash_password)) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         } else {
//           done(null, false);
//         }
//       })
//       .catch((err) => {
//         return done(err);
//       });;
//   }
// ));

// // Serialize and deserialize user sessions
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// module.exports = passport;
