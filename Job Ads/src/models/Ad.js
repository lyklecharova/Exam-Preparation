const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: [true, "Headline is required"],
  },
  location: {
    type: String,
    required: [true, "Location  is required"],
  },
  companyName: {
    type: String,
    required: [true, "Comapny name  is required"],
  },
  companyDescription: {
    type: String,
    required: [true, "Comapny description  is required"],
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  usersApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
