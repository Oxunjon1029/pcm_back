const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
module.exports.ensureAuthenticated = (req, res, next) => {
  console.log(req.headers)
  // if (!token) {
  //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
  // }

  // // Verify the token
  // jwt.verify(token, process.env.JWT_SECRET, (err) => {
  //   if (err) {
  //     return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  //   }


  //   next();
  // });
}