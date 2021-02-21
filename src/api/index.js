const express = require("express");
const router = express.Router();
const book = require("./book");
const shelf = require("./shelf");

router.use("/books", book);
router.use("/shelves", shelf);

module.exports = router;
