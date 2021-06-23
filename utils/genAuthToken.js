const jwt = require("jsonwebtoken");
require("dotenv").config();

function genAuthToken(user_id) {
  const payload = {
    id: user_id,
  };

  const token = jwt.sign(payload, process.env.jwtPrivateKey, {
    expiresIn: "1hr",
  });
  return token;
}

module.exports = genAuthToken;
