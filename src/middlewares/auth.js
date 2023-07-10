const { StatusCodes } = require('http-status-codes');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unathorized'
    })
  }
}