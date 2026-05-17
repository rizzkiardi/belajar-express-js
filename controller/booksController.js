const { default: books } = require("../books");

const { Book } = require("../models");

const findAllBooks = async (req, res) => {
  try {
    const data = await Book.findAll();
    const result = {
      status: "ok",
      data: data,
    };
    res.json(result);
  } catch (error) {
    console.log(error, "Error, find all books");
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findByPk(id);
    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `Data book with id ${id} is not found`,
      });
    }
    res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log(error, "Error get book by ID");
  }
};

const createNewBooks = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const newBook = await Book.create({
      title: title,
      category: category,
      description: description,
    });

    res.status(201).json({
      status: "ok",
      data: {
        title: newBook.title,
        category: newBook.category,
        description: newBook.description,
        createdAt: newBook.createdAt,
        udpatedAt: newBook.udpatedAt,
      },
    });
  } catch (error) {
    console.log(error, "Error create new book");
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: `data book with id${id} is not exists`,
      });
    }

    book.title = title;
    book.category = category;
    book.description = description;
    book.updatedAt = new Date();

    book.save();

    res.json({
      status: "ok",
      data: {
        id: book.id,
        title: book.title,
        category: book.category,
        description: book.description,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      },
    });
  } catch (error) {
    console.log(error, "Error update book");
  }
};

const destroyBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        status: "failed",
        message: `data book with id${id} is not exists`,
      });
    }

    book.destroy();

    res.json({
      status: "ok",
      message: `Success delete book with id ${id}`,
    });
  } catch (error) {
    console.log(error, "Error destroy book");
  }
};

module.exports = {
  findAllBooks,
  getBookById,
  createNewBooks,
  updateBook,
  destroyBook,
};
