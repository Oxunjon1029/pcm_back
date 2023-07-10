const { StatusCodes } = require('http-status-codes');

module.exports.isAuthenticatedAndAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'This is not admin'
    })
  }
}