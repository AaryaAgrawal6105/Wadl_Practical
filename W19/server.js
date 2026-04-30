const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/music")
  .then(() => console.log("Mongo Connected"));

// SCHEMA
const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String
});

const Song = mongoose.model("Song", songSchema);

// INSERT 5 SONGS
app.get("/insert", async (req, res) => {
  await Song.insertMany([
    { songname: "S1", film: "F1", music_director: "MD1", singer: "Singer1" },
    { songname: "S2", film: "F2", music_director: "MD1", singer: "Singer2" },
    { songname: "S3", film: "F3", music_director: "MD2", singer: "Singer1" },
    { songname: "S4", film: "F4", music_director: "MD2", singer: "Singer3" },
    { songname: "S5", film: "F5", music_director: "MD3", singer: "Singer2" }
  ]);
  res.send("Inserted");
});

// DISPLAY ALL
app.get("/all", async (req, res) => {
  res.json(await Song.find());
});

// FILTER
app.get("/director/:name", async (req, res) => {
  res.json(await Song.find({ music_director: req.params.name }));
});

// DELETE
app.get("/delete/:name", async (req, res) => {
  await Song.deleteOne({ songname: req.params.name });
  res.send("Deleted");
});

// UPDATE
app.get("/update/:name", async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },
    { $set: { actor: "Actor1", actress: "Actress1" } }
  );
  res.send("Updated");
});

app.listen(3000);