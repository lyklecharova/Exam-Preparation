const Ad = require("../models/Ad");

exports.getAll = () => Ad.find().populate("author");

exports.getOne = (adId) => Ad.findById(adId).populate("author");

exports.create = (adData) => Ad.create(adData);

exports.delete = (adId) => Ad.findByIdAndDelete(adId);

exports.edit = (adId, adData) =>
  Ad.findByIdAndUpdate(adId, adData);

exports.apply = async (adId, applyData) => {
  const ad = await Ad.findById(adId);

  ad.usersApplied.push(applyData);

  return ad.save(); // return a promise
};

exports.getByOwner = (userId) => Ad.find({ author: userId });
