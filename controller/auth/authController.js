const User = require("../../models/User");

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "", username: "" };

  if (err.code === 11000) {
    if (err.message.includes("username"))
      errors.username = "Username is already registered";
    if (err.message.includes("email"))
      errors.email = "email is already registered";

    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json(errors);
  }
};

module.exports.login = (req, res) => {
  res.send(`user login ${JSON.stringify(req.body)}`);
};
