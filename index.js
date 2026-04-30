const express = require("express");
const { default: books } = require("./books");
const app = express();
const port = 3000;

// GET, POST, PUT, PATCH, DELETE
// app.get("/", (req, res) => {
//   res.send("Belajar express");
// });

// GET
app.get("/about", (req, res) => {
  res.send("Ini halaman about");
});

// app.get("/users/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(`Users dengan id ${id}`);
// });

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

  res.json({
    status: "OK",
    data: book,
  });
});
