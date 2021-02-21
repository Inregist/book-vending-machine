require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./api");

const { PORT, DB_URI } = process.env;

const mongoose = require("mongoose");
mongoose
  .connect(DB_URI || "mongodb://localhost:27017/book-vending", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT || 5000, () => {
      console.log(`API is on localhost:${process.env.PORT || 5000}`);
    })
  );

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);
