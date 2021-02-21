const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    min: [100, "we need profit!"],
    required: true,
  },
  position: {
    shelf: { type: Number },
    index: { type: Number },
  },
});
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
