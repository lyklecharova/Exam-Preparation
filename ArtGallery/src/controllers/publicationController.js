const router = require("express").Router();

const publicationManager = require("../managers/publicationManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const arts = await publicationManager.getAll().lean();

  res.render("arts", { arts }); // {arts: []} -> 'No arts post yet.' //index do not write
});

router.get("/create", isAuth, (req, res) => {
  res.render("arts/create");
});

router.post("/create", isAuth, async (req, res) => {
  const artData = {
    ...req.body,
    author: req.user._id,
  };

  try {
    await publicationManager.create(artData);

    res.redirect("/arts");
  } catch (err) {
    res.render("arts/create", { error: getErrorMessage(err) });
  }
});

router.get("/:artId/details", async (req, res) => {
  const artId = req.params.artId;
  const art = await publicationManager
    .getOne(artId)
    .populate("usersShared.user")
    .lean();
  const isOwner = art.author._id.toString() == req.user?._id;
  const isShared = art.usersShared?.some((id) => id.toString() == req.user?._id);;

  res.render("arts/details", { art, isOwner, isShared });
});

router.get("/:artId/delete", isAuth, async (req, res) => {
  const artId = req.params.artId;

  try {
    await publicationManager.delete(artId);

    res.redirect("/arts");
  } catch (err) {
    res.render(`/arts/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:artId/edit", isAuth, async (req, res) => {
  const art = await publicationManager.getOne(req.params.artId).lean();

  res.render("arts/edit", { art });
});

router.post("/:artId/edit", isAuth, async (req, res) => {
  const artId = req.params.artId;
  const artData = req.body;

  try {
    await publicationManager.edit(artId, artData);

    res.redirect(`/arts/${artId}/details`);
  } catch (err) {
    res.render("arts/edit", {
      error: "Unable to update art",
      ...artData,
    });
  }
});

router.get("/:artId/usersShared", isAuth, async (req, res) => {
  const artId = req.params.artId;
  const user = req.user._id;

  await publicationManager.share(artId, user);

  res.redirect(`/arts/${artId}/details`);
});
module.exports = router;
