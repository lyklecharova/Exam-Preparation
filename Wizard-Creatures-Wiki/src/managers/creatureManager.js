const Creature = require("../models/Creature");

exports.getAll = () => Creature.find().populate("owner");

exports.getOne = (creatureId) => Creature.findById(creatureId).populate("owner");

exports.create = (creatureData) => Creature.create(creatureData);

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.edit = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

exports.vote = async (creatureId, voteData) => {
  const creature = await Creature.findById(creatureId);

  creature.votes.push(voteData);

  return creature.save(); // return a promise
};

exports.getByOwner = (userId) => Creature.find({ owner: userId });
