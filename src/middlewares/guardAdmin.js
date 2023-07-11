const { StatusCodes } = require('http-status-codes');

module.exports.isAuthenticatedAndAdmin = async (req, res, next) => {
  console.log(req.user)
  if (req.user?.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. User is not an admin.' });
  }

  next();
}