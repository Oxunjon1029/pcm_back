const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
module.exports.ensureAuthenticated = (req, res, next) => {
  console.log(req.user)
  if (req.user) {
    next()
  } else {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      }
      req.user = decoded?.user

      next();
    });
  }

}