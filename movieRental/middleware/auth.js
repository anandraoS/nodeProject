const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access denied no token provided");
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (exc) {
      res.status(400).send('Invalid Token');
  }
};
