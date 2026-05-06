const { default: books } = require("../books");

const findAllBooks = (req, res) => {
  const data = books;
  const result = {
    status: "OK",
    data: data,
  };

  res.json(result);
};

const getBookById = (req, res) => {
  const { id } = req.params;

  let book;
  // proses data looping data
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === Number(id)) {
      book = books[i];
    }
  }

  // handle not found
  if (book === undefined) {
    return res
      .status(404)
      .json({ status: "Failed", message: `Data book with id ${id} not found` });
  }

  res.json({
    status: "OK",
    data: book,
  });
};

const createNewBooks = (req, res) => {
  const { title, category, description } = req.body;

  // mendapatkan new id
  const lastItemBookId = books[books.length - 1].id;
  const newIdBook = lastItemBookId + 1;

  // menambahkan buku baru
  const newBookData = {
    id: newIdBook,
    title: title,
    category: category,
    description: description,
  };
  books.push(newBookData);

  // mengembalikan response ke client
  res.status(201).json({
    status: "OK",
    message: "Success create new book",
    data: newBookData,
  });
};

module.exports = { findAllBooks, getBookById, createNewBooks };
