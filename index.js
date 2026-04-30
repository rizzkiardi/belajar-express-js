const express = require("express");
const { default: books } = require("./books");
const app = express();
const port = 3000;

app.use(express.json());

// GET
// app.get("/", (req, res) => {
//   res.send("Belajar express");
// });

// GET
app.get("/about", (req, res) => {
  res.send("Ini halaman about");
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Users dengan id ${id}`);
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

// response JSON
app.get("/", (req, res) => {
  res.json({ message: "hello ini json response" });
});

// Books
app.get("/books", (req, res) => {
  // mendapatkan semua data buku
  const data = books;

  // response json
  const result = {
    status: "OK",
    data: data,
  };

  res.json(result);
});

// GET books berdasarkan id
app.get("/books/:id", (req, res) => {
  // mendapatkan req params id
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
});

// POST
// Create Book
app.post("/books", (req, res) => {
  // mendapatkan req body
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
});
