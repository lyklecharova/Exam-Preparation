const router = require("express").Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const creatureController = require("./controllers/creatureController");

router.use(homeController);
router.use("/users", userController);
router.use("/creatures", creatureController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
