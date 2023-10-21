const router = require("express").Router();

const bookManager = require("../managers/bookManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/profile", isAuth, async (req, res) => {
  const books = await bookManager.getByOwner(req.user._id).lean();
  res.render("profile", { books });
});

module.exports = router;
