const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");
const passport = require('passport')
router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);
router.route('/loginWithGoogle').get(passport.authenticate('google', { scope: ['profile', 'email'] }))
router.route('/auth/google/callback').get(passport.authenticate('google',
  {
    failureMessage: 'Cannot login, please try again',
    failureRedirect: 'http://localhost:3000/loginSuccess',
    successRedirect: 'http://localhost:3000/loginError'
  }))

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router