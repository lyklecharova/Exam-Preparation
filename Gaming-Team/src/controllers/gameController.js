const router = require("express").Router();

const gameManager = require("../managers/gameManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const games = await gameManager.getAll().lean();

  res.render("games", { games }); // {games: []} -> 'No games post yet.' //index не се пише
});

router.get("/create", isAuth, (req, res) => {
  res.render("games/create");
});

router.post("/create", isAuth, async (req, res) => {
  const gameDta = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await gameManager.create(gameDta);

    res.redirect("/games");
  } catch (err) {
    res.render("games/create", { error: getErrorMessage(err) });
  }
});

router.get("/:gameId/details", async (req, res) => {
  const gameId = req.params.gameId;
  const game = await gameManager
    .getOne(gameId)
    .populate("boughtBy.user")
    .lean();
  const isOwner = game.owner._id.toString() == req.user?._id;
  const isBuy = game.boughtBy?.some((id) => id.toString() == req.user?._id);;

  res.render("games/details", { game, isOwner, isBuy });
});

router.get("/:gameId/delete", isAuth, async (req, res) => {
  const gameId = req.params.gameId;

  try {
    await gameManager.delete(gameId);

    res.redirect("/games");
  } catch (err) {
    res.render(`/games/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:gameId/edit", isAuth, async (req, res) => {
  const game = await gameManager.getOne(req.params.gameId).lean();

  res.render("games/edit", { game });
});

router.post("/:gameId/edit", isAuth, async (req, res) => {
  const gameId = req.params.gameId;
  const gameDta = req.body;

  try {
    await gameManager.edit(gameId, gameDta);

    res.redirect(`/games/${gameId}/details`);
  } catch (err) {
    res.render("games/edit", {
      error: "Unable to update game",
      ...gameDta,
    });
  }
});

router.get("/:gameId/boughtBy", isAuth, async (req, res) => {
  const gameId = req.params.gameId;
  const user = req.user._id;

  await gameManager.buy(gameId, user);

  res.redirect(`/games/${gameId}/details`);
});
module.exports = router;
