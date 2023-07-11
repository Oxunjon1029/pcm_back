const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
module.exports.ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
    console.log(decoded)
    req.user = decoded?.user

    next();
  });
}