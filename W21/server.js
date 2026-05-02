const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/books");

const Book = mongoose.model("Book", {
  title: String,
  author: String,
  price: Number,
  genre: String
});

// Seed sample books
app.get("/insert", async (req, res) => {
  await Book.insertMany([
    { title: "B1", author: "A1", price: 500, genre: "Fiction" },
    { title: "B2", author: "A2", price: 700, genre: "Tech" }
  ]);
  res.send("Inserted");
});

// Add a new book
app.get("/add/:title/:author/:price/:genre", async (req, res) => {
  await Book.create({
    title: req.params.title,
    author: req.params.author,
    price: req.params.price,
    genre: req.params.genre
  });
  res.send("Added");
});

// View all
app.get("/all", async (req, res) => {
  res.json(await Book.find());
});

// Update price by title
app.get("/update/:title/:price", async (req, res) => {
  await Book.updateOne(
    { title: req.params.title },
    { $set: { price: req.params.price } }
  );
  res.send("Updated");
});

// Delete by title
app.get("/delete/:title", async (req, res) => {
  await Book.deleteOne({ title: req.params.title });
  res.send("Deleted");
});

app.listen(3000);
