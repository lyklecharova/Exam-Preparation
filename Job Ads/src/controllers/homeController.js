const router = require("express").Router();

const adManager = require("../managers/adManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", async (req, res) => {
  const { search, companyName } = req.query;
  let ads = await adManager.getAll(req.user._id).lean();
  console.log(ads);
  if (search) ads = ads.filter((ad) => ad.author.email.toLowerCase().includes(search.toLowerCase()));
  res.render("search", { search, ads, companyName });
});

module.exports = router;
