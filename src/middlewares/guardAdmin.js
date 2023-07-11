const { StatusCodes } = require('http-status-codes');
const User = require('../models/users')

module.exports.isAuthenticatedAndAdmin = async (req, res, next) => {
  console.log(req.body)
  const user = await User.findOne({ email: req.body.email })
  if (user && user.role === 'admin') {
    next()
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'This is not admin'
    })
  }
}