const Users = require('../models/users')

async function getUserByEmail(email) {
  const user = await Users.findOne({ email: email });
  return user;
}

module.exports = {
  getUserByEmail
}