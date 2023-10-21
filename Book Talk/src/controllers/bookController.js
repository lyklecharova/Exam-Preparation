const router = require("express").Router();

const bookManager = require("../managers/bookManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const books = await bookManager.getAll().lean();

  res.render("books", { books }); // {books: []} -> 'No books post yet.' //index не се пише
});

router.get("/create", isAuth, (req, res) => {
  res.render("books/create");
});

router.post("/create", isAuth, async (req, res) => {
  const bookData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await bookManager.create(bookData);

    res.redirect("/books");
  } catch (err) {
    res.render("books/create", { error: getErrorMessage(err) });
  }
});

router.get("/:bookId/details", async (req, res) => {
  const bookId = req.params.bookId;
  const book = await bookManager
    .getOne(bookId)
    .populate("wishingList.user")
    .lean();
  const isOwner = book.owner._id.toString() == req.user?._id;
  const isWished = book.wishingList?.some((id) => id.toString() == req.user?._id);;

  res.render("books/details", { book, isOwner, isWished });
});

router.get("/:bookId/delete", isAuth, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    await bookManager.delete(bookId);

    res.redirect("/books");
  } catch (err) {
    res.render(`/books/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:bookId/edit", isAuth, async (req, res) => {
  const book = await bookManager.getOne(req.params.bookId).lean();

  res.render("books/edit", { book });
});

router.post("/:bookId/edit", isAuth, async (req, res) => {
  const bookId = req.params.bookId;
  const bookData = req.body;

  try {
    await bookManager.edit(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
  } catch (err) {
    res.render("books/edit", {
      error: "Unable to update book",
      ...bookData,
    });
  }
});

router.get("/:bookId/wishingList", isAuth, async (req, res) => {
  const bookId = req.params.bookId;
  const user = req.user._id;

  await bookManager.wish(bookId, user);

  res.redirect(`/books/${bookId}/details`);
});
module.exports = router;
