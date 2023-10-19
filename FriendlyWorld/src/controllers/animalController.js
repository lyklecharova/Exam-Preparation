const router = require("express").Router();

const animalManager = require("../managers/animalManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const animals = await animalManager.getAll().lean();

  res.render("animals", { animals }); // {animals: []} -> 'No animals post yet.' //index не се пише
});

router.get("/create", isAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/create", isAuth, async (req, res) => {
  const animalData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await animalManager.create(animalData);

    res.redirect("/animals");
  } catch (err) {
    res.render("animals/create", { error: getErrorMessage(err) });
  }
});

router.get("/:animalId/details", async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager
    .getOne(animalId)
    .populate("donations.user")
    .lean();
  const isOwner = animal.owner._id.toString() == req.user?._id;
  const isDonated = animal.donations?.some((id) => id.toString() == req.user?._id);;

  res.render("animals/details", { animal, isOwner, isDonated });
});

router.get("/:animalId/delete", isAuth, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    await animalManager.delete(animalId);

    res.redirect("/animals");
  } catch (err) {
    res.render(`/animals/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:animalId/edit", isAuth, async (req, res) => {
  const animal = await animalManager.getOne(req.params.animalId).lean();

  res.render("animals/edit", { animal });
});

router.post("/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animalData = req.body;

  try {
    await animalManager.edit(animalId, animalData);

    res.redirect(`/animals/${animalId}/details`);
  } catch (err) {
    res.render("animals/edit", {
      error: "Unable to update animal",
      ...animalData,
    });
  }
});

router.get("/:animalId/donations", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const user = req.user._id;

  await animalManager.donation(animalId, user);

  res.redirect(`/animals/${animalId}/details`);
});
module.exports = router;
