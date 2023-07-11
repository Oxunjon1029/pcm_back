module.exports.ensureAuthenticated = (req, res, next) => {
  console.log('request', req)
  if (req.isAuthenticated) {
    return next();
  }
}