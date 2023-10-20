const router = require("express").Router();

const publicationManager = require("../managers/publicationManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/profile", isAuth, async (req, res) => {
  const arts = await publicationManager.getByOwner(req.user._id).lean();
  res.render("profile", { arts });
});

module.exports = router;
