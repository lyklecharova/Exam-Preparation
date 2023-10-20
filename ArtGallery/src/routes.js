const router = require("express").Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const publicationController = require("./controllers/publicationController");

router.use(homeController);
router.use("/users", userController);
router.use("/arts", publicationController);
router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
