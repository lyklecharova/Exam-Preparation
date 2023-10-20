const Publication = require("../models/Publication");

exports.getAll = () => Publication.find().populate("author");

exports.getOne = (artId) => Publication.findById(artId).populate("author");

exports.create = (artData) => Publication.create(artData);

exports.delete = (artId) => Publication.findByIdAndDelete(artId);

exports.edit = (artId, artData) =>
Publication.findByIdAndUpdate(artId, artData);

exports.share = async (artId, shareData) => {
  const art = await Publication.findById(artId);

  art.usersShared.push(shareData);

  return art.save(); // return a promise
};

exports.getByOwner = (userId) => Publication.find({ author: userId });
