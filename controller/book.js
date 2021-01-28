const Book = require("../models/Book");

exports.postBook = async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const publisher = req.body.publisher;
  const ISBN = req.body.ISBN;

  try {
    const book = new Book({
      title,
      author,
      year,
      publisher,
      ISBN,
    });

    const data = await book.save();

    res.json({
      message: "new book record has been added.",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    if (!books) {
      const err = new Error("no entry in the database.");
      err.status = 404;
      throw err;
    }

    res.status(200).json(
      {
        message: "successfully fetch all the data.",
        data: books,
      },
    );
  } catch (err) {
    next(err);
  }
};

exports.getOneBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);

    if (!book) {
      const err = new Error("no record with that id.");
      err.status = 404;
      throw err;
    }

    res.status(200).json(
      { message: "successfully fetch a record", data: book },
    );
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const publisher = req.body.publisher;
  const ISBN = req.body.ISBN;

  try {
    const book = await Book.findById(id);
    book.title = title;
    book.author = author;
    book.year = year;
    book.publisher = publisher;
    book.ISBN = ISBN;

    const data = await book.save();
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Book.deleteOne({ _id: id });
    res.status(200).json({ message: "a record has been deleted." });
  } catch (err) {
    next(err);
  }
};
