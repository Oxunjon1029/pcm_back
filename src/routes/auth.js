const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");
const passport = require('passport')

router.route("/signin").post(validateSignIpRequest, isRequestValidated, passport.authenticate('local', { session: false }));


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router