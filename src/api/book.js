const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Shelf = require("../models/shelf");
const { createShelf } = require("./shelf");

router.get("/find", async (req, res) => {
  const { name, category } = req.query;
  const query = [];
  if (name) query.push({ name });
  if (category) query.push({ category });

  try {
    const book = await Book.findOne(
      { $and: query },
      { _id: false, __v: false }
    );
    res.json({ book });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  const { name, description, category, price } = req.body;

  try {
    //find open slot shelf, if no open slot => create one
    const availShelf =
      (await Shelf.findOne({ isFull: false })) || (await createShelf());
    // find slot for a book
    const availIndex = availShelf.books.indexOf(null);

    //create book
    const book = Book({
      name,
      description,
      category,
      price,
      position: {
        shelf: availShelf.shelf,
        index: availIndex,
      },
    });
    const newBook = await book.save();

    //update shelf
    availShelf.books[availIndex] = newBook;

    //check if shelf is full
    if (availShelf.books.indexOf(null, availIndex + 1) === -1)
      availShelf.isFull = true;

    await Shelf.updateOne({ shelf: availShelf.shelf }, availShelf);

    res.json({ book: newBook });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.put("/edit/:qname", async (req, res) => {
  const { qname } = req.params;
  const update = req.body;
  try {
    const book = await Book.findOne({ name: qname });
    if (!book) {
      res.status(404).json({ message: "book not found" });
      return;
    }

    const newBook = await Book.updateOne({ name: qname }, update);
    res.json({ book: newBook });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/remove/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const book = await Book.findOne({ name });
    if (!book) {
      res.status(404).json({ message: "book not found" });
      return;
    }

    const shelf = await Shelf.findOne({ shelf: book.position.shelf });
    shelf.books[book.position.index] = null;
    shelf.isFull = false;
    await Shelf.updateOne({ shelf: book.position.shelf }, shelf);

    await book.delete();
    res.json({ book: name });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
