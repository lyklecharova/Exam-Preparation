const router = require("express").Router();

const creatureManager = require("../managers/creatureManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const creatures = await creatureManager.getAll().lean();

  res.render("creatures", { creatures }); // {creatures: []} -> 'No creatures post yet.' //index не се пише
});

router.get("/create", isAuth, (req, res) => {
  res.render("creatures/create");
});

router.post("/create", isAuth, async (req, res) => {
  const creatureData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await creatureManager.create(creatureData);

    res.redirect("/creatures");
  } catch (err) {
    res.render("creatures/create", { error: getErrorMessage(err) });
  }
});

router.get("/:creatureId/details", async (req, res) => {
  const creatureId = req.params.creatureId;
  const creature = await creatureManager
    .getOne(creatureId)
    .populate("votes.user")
    .lean();
  const isOwner = creature.owner._id.toString() == req.user?._id;
  const isVoted = creature.votes?.some((id) => id.toString() == req.user?._id);;

  res.render("creatures/details", { creature, isOwner, isVoted });
});

router.get("/:creatureId/delete", isAuth, async (req, res) => {
  const creatureId = req.params.creatureId;

  try {
    await creatureManager.delete(creatureId);

    res.redirect("/creatures");
  } catch (err) {
    res.render(`/creatures/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:creatureId/edit", isAuth, async (req, res) => {
  const creature = await creatureManager.getOne(req.params.creatureId).lean();

  res.render("creatures/edit", { creature });
});

router.post("/:creatureId/edit", isAuth, async (req, res) => {
  const creatureId = req.params.creatureId;
  const creatureData = req.body;

  try {
    await creatureManager.edit(creatureId, creatureData);

    res.redirect(`/creatures/${creatureId}/details`);
  } catch (err) {
    res.render("creatures/edit", {
      error: "Unable to update creature",
      ...creatureData,
    });
  }
});

router.get("/:creatureId/votes", isAuth, async (req, res) => {
  const creatureId = req.params.creatureId;
  const user = req.user._id;

  await creatureManager.vote(creatureId, user);

  res.redirect(`/creatures/${creatureId}/details`);
});
module.exports = router;
