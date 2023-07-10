const { StatusCodes } = require('http-status-codes');

module.exports.isAuthenticated = (req, res, next) => {
  console.log(req.user)
  if (req.user) {
    next()
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unathorized'
    })
  }
}