const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [4, "Name should be at least 4 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    minLength: [0, "Price should be a positive number"],
    maxLength: [100, "Price should be positive number"],
  },
  description: {
    type: String,
    required: [true, "Description  is required"],
    minLength: [10, "Description should be at least 10 characters"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    minLength: [2, "Genre should be at least 2 characters"],
  },
  platform: {
    type: String,
    required: true,
    enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  boughtBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
