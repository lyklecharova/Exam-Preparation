const router = require("express").Router();

const gameManager = require("../managers/gameManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", isAuth, async (req,res)=>{
  const {search, platform} = req.query;
  let games = await gameManager.getAll().lean()
  if(search) games = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
  if(platform) games =games.filter(game => game.platform.toLowerCase().includes(platform.toLowerCase()));

  res.render("search", {games, search, platform});
});
module.exports = router;
