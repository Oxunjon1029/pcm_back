module.exports.ensureAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated)
  if (req.isAuthenticated) {
    return next();
  }
}