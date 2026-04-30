const express = require("express");
const app = express();
const port = 3000;

// GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res) => {
  res.send("Belajar express");
});

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
