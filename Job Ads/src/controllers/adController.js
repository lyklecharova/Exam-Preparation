const router = require("express").Router();

const adManager = require("../managers/adManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const ads = await adManager.getAll().lean();

  res.render("ads", { ads }); // {ads: []} -> 'No ads post yet.' //index не се пише
});

router.get("/create", isAuth, (req, res) => {
  res.render("ads/create");
});

router.post("/create", isAuth, async (req, res) => {
  const adData = {
    ...req.body,
    author: req.user._id,
  };

  try {
    await adManager.create(adData);

    res.redirect("/ads");
  } catch (err) {
    res.render("ads/create", { error: getErrorMessage(err) });
  }
});

router.get("/:adId/details", async (req, res) => {
  const adId = req.params.adId;
  const ad = await adManager
    .getOne(adId)
    .populate("usersApplied")
    .lean();
    
  const isOwner = ad.author._id.toString() == req.user?._id;
  const isApplied = ad.usersApplied?.some((user) => user._id.toString() == req.user?._id);
  const shouldShow = isOwner && (ad.usersApplied.length > 0)
  const usersApplied = ad.usersApplied;

  res.render("ads/details", { ad, isOwner, isApplied, shouldShow, usersApplied});
});

router.get("/:adId/delete", isAuth, async (req, res) => {
  const adId = req.params.adId;

  try {
    await adManager.delete(adId);

    res.redirect("/ads");
  } catch (err) {
    res.render(`/ads/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:adId/edit", isAuth, async (req, res) => {
  const ad = await adManager.getOne(req.params.adId).lean();

  res.render("ads/edit", { ad });
});

router.post("/:adId/edit", isAuth, async (req, res) => {
  const adId = req.params.adId;
  const adData = req.body;

  try {
    await adManager.edit(adId, adData);

    res.redirect(`/ads/${adId}/details`);
  } catch (err) {
    res.render("ads/edit", {
      error: "Unable to update ad",
      ...adData,
    });
  }
});

router.get("/:adId/usersApplied", isAuth, async (req, res) => {
  const adId = req.params.adId;
  const user = req.user._id;

  console.log(adId, user);
  await adManager.apply(adId, user);

  res.redirect(`/ads/${adId}/details`);
});
module.exports = router;
