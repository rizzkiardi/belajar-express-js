const {
  findAllBooks,
  getBookById,
  createNewBooks,
  updateBook,
  destroyBook,
} = require("../controller/booksController");

const router = require("express").Router();

// router.get("/books", (req, res) => {
//   res.json({ message: "Dari Router dengan method GET" });
// });

// GET all books
router.get("/books", findAllBooks);

// GET books by id
router.get("/books/:id", getBookById);

// POST
// Create new books
router.post("/books", createNewBooks);

// PATCH
// update books
router.patch("/books/:id", updateBook);

// DELETE
// delete books
router.delete("/books/:id", destroyBook);

module.exports = router;
