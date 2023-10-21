const router = require("express").Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const bookController = require("./controllers/bookController");

router.use(homeController);
router.use("/users", userController);
router.use("/books", bookController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
