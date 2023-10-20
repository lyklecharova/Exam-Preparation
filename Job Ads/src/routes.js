const router = require("express").Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const adController = require("./controllers/adController");

router.use(homeController);
router.use("/users", userController);
router.use("/ads", adController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
