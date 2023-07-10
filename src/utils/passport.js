const db = require("./db");

const jwtCallback = async (jwt_payload, done) => {
  const user = await db.getUserByEmail(jwt_payload.email);
  done(null, user || false);
}

module.exports = {
  jwtCallback,
}