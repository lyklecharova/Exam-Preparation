const bcrypt = require("bcrypt");

const jwt = require("../lib/jwt");
const User = require("../models/User");
const { SECRET } = require("../config/config");

exports.login = async (username, password) => {
  // TODO: find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  // check password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const token = await generateToken(user);

  return token;
};

exports.register = async (userData) => {
  const user = await User.findOne({ username: userData.username });
  if (user) {
    throw new Error("Username already exists");
  }

  const createdUser = await User.create(userData);

  const token = await generateToken(createdUser);

  return token;
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    address: user.address,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });

  return token;
}
