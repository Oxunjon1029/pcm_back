const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");
const passport = require('passport');
const { StatusCodes } = require("http-status-codes");
router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);
router.route('/loginWithGoogle').get(passport.authenticate('google', { scope: ['email', 'profile'] }))
router.route('/login/success').get((req, res) => {
  try {
    const token = req.headers.authorization;
    console.log('token', token)
    if (token) {
      const decoded = jwt.verify(token, COOKIE_SECRET);
      const user = decoded?.user;
      console.log(user)
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Successfully logged in',
        user: user
      })
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
})
router.route('/auth/google/callback').get(passport.authenticate('google',
  {
    session: false,
    failureMessage: 'Cannot login, please try again',
    failureRedirect: 'http://localhost:3000/loginError',
    successRedirect: 'http://localhost:3000/loginSuccess'
  }), (req, res) => {
    const token = req.user;
    console.log('sent token:',token)
    return res.status(StatusCodes.OK).json({ token })
  })

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router