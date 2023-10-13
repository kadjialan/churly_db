const jwt = require("jsonwebtoken");

function signToken(data) {
  return jwt.sign(
    {
      data,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: '30d' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.PRIVATE_KEY);
}

module.exports = { signToken, verifyToken };
