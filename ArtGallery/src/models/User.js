const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [4, "Username must be at least 4 characters"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minLength: [20, "Password must be at least 20 characters"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [3, "Password must be at least 3 characters"],
  },

  myPublications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication", // Reference to the Publications model
    },
  ],
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
