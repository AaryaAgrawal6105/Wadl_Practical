const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/books");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String
});

const Book = mongoose.model("Book", bookSchema);

// CREATE
app.post("/add", async (req, res) => {
  await Book.create(req.body);
  res.send("Book added");
});

// READ
app.get("/all", async (req, res) => {
  res.json(await Book.find());
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(3000);