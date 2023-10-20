const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [6, "Title must be at least 6 characters"],

  },
  paintingtechnique : {
    type: String,
    required: [true, 'Painting technique   is required'],
    maxLength: [15, "Title must be at least 15 characters"],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],	
    match: [/^https?:\/\//, "Invalid URL"],
  },
  certificate: {
    type: String,
    enum: ["Yes", "No"],
    required: [true, 'Certificate is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  usersShared: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;
