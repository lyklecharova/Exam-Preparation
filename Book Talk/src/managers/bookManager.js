const Book = require("../models/Book");

exports.getAll = () => Book.find().populate("author");

exports.getOne = (bookId) => Book.findById(bookId).populate("owner");

exports.create = (bookData) => Book.create(bookData);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) =>
  Book.findByIdAndUpdate(bookId, bookData);

exports.wish = async (bookId, shareData) => {
  const book = await Book.findById(bookId);

  book.wishingList.push(shareData);

  return book.save(); // return a promise
};

exports.getByOwner = (userId) => Book.find({ owner: userId });
