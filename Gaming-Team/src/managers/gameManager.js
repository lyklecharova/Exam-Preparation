const Game = require("../models/Game");

exports.getAll = () => Game.find().populate("owner");

exports.getOne = (gameId) => Game.findById(gameId).populate("owner");

exports.create = (gameData) => Game.create(gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.edit = (gameId, gameData) =>
Game.findByIdAndUpdate(gameId, gameData);

exports.buy = async (gameId, buyData) => {
  const game = await Game.findById(gameId);

  game.boughtBy.push(buyData);

  return game.save(); // return a promise
};

exports.getByOwner = (userId) => Game.find({ owner: userId });
