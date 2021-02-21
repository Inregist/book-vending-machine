const express = require("express");
const router = express.Router();
const Shelf = require("../models/shelf");
const Book = require("../models/book");

const createShelf = async () => {
  const [lastShelf] = await Shelf.find({}).sort({ _id: -1 }).limit(1);
  try {
    const shelf = Shelf({
      shelf: lastShelf ? lastShelf.shelf + 1 : 0,
    });
    const newShelf = await shelf.save();
    return newShelf;
  } catch (err) {
    throw err.message;
  }
};

router.get("/:qshelf", async (req, res) => {
  const { qshelf } = req.params;
  try {
    const shelf = await Shelf.find({ shelf: qshelf });

    res.json({ shelf: shelf });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newShelf = await createShelf();
    res.json({ shelf: newShelf });
  } catch (err) {
    res.json({ error: err });
  }
});

router.delete("/remove/:shelf", async (req, res) => {
  const { shelf } = req.params;

  try {
    const shelf_del = await Shelf.findOne({ shelf });
    if (!shelf_del) {
      res.status(404).json({ message: "shelf not found" });
      return;
    }

    const books = shelf_del.books
      .filter((b) => b !== null)
      .map((b) => ({ _id: b }));

    const result = await Book.deleteMany({ $or: books });

    await shelf_del.delete();
    res.json({ shelf });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
module.exports.createShelf = createShelf;
