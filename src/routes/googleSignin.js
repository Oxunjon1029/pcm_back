// const router = require('express').Router();
// const passport = require('passport');

// router.route('/login/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// const successLoginUrl = 'http://localhost:3000/user-profile'
// const errorLoginUrl = 'http://localhost:3000/login'
// router.route('/auth/google/callback').get(passport.authenticate('google', {
//   failureMessage: 'Cannot login to Google,please try again later',
//   failureRedirect: errorLoginUrl,
//   successRedirect: successLoginUrl
// }),
//   (req, res) => {
//     res.send('Thank you for signing in')
//   })