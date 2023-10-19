const Animal = require("../models/Animal");

exports.getAll = () => Animal.find().populate("owner");

exports.getOne = (animalId) => Animal.findById(animalId).populate("owner");

exports.create = (animalData) => Animal.create(animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

exports.donation = async (animalId, donationsData) => {
  const animal = await Animal.findById(animalId);

  animal.donations.push(donationsData);

  return animal.save(); // return a promise
};

exports.getByOwner = (userId) => Animal.find({ owner: userId });
