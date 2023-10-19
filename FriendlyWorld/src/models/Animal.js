const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name should be at least 2 characters"],
  },
  years: {
    type: Number,
    required: [true, "Years  is required"],
    minLength: [1, 100, "Years should be a positive number between 1 and 100"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
    minLength: [3, "Kind should be at least 3 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  need: {
    type: String,
    required: [true, "Need is required"],
    minLength: [3, "Kind should be at least 3 characters"],
    maxLength: [20, "Kind should be at least 20 characters"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: [5, "Location should be at least 5 characters"],
    maxLength: [15, "Location should be at least 15 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [5, "Location should be at least 5 characters"],
    maxLength: [50, "Location should be at least 50 characters"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
