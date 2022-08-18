const jwt = require("jsonwebtoken");
const User = require("../models/User")

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // check for the jwt
  if (!authorization) {
    res.status(400).json({ error: "unauthorized access" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, "abinash ladger web secrete");
    req.user = await User.findOne({ _id }).select("_id")
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: "request is not authorized" });
  }
};

module.exports = {
  requireAuth,
};
