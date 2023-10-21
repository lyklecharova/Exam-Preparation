const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [2, 'Title must be at least 2 characters'],
    
  },
  author: {
    type: String,
    required: [true, 'Author  is required'],
    minLength: [5, 'Author must be at least 5 characters'],
    
  },
  review: {
    type: String,
    required: [true, 'Review  is required'],
    minLength: [10, 'Review must be at least 10 characters'],
    
  },
  image: {
    type: String,
    required: [true, 'Image is required'],	
    match: [/^https?:\/\//, "Invalid URL"],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    minLength: [3, 'Review must be at least 3 characters'],
  },
  stars: {
    type: Number,
    required: true,
    // min: 1,
    // max: 5
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wishingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
