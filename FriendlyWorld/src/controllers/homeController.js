const router = require("express").Router();

const animalManager = require("../managers/animalManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", async (req, res) => {
  const { search } = req.query;
  let animals = await animalManager.getAll().lean();
  if (search)
    animals = animals.filter((animal) =>
      animal.name.toLowerCase().includes(search.toLowerCase())
    );

  res.render("search", { animals, search });
});

module.exports = router;
