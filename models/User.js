const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [(value) => emailRegex.test(value), "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// static method
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password")
  }
  throw Error("incorrect username");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
