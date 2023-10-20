const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [10, "Email must be at least 10 characters"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  myAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
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
