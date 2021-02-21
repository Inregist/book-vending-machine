const mongoose = require("mongoose");
const { Schema } = mongoose;

const shelfSchema = Schema({
  shelf: {
    type: Number,
    unique: true,
  },
  books: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    default: [null, null, null, null, null],
    validate: [(arr) => arr.length <= 5, "a shelf can store 5 books"],
  },
  isFull: {
    type: Boolean,
    default: false,
  },
});
const Shelf = mongoose.model("Shelf", shelfSchema);

module.exports = Shelf;
