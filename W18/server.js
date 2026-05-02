const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/music");

const Song = mongoose.model("Song", {
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String
});

// c) Insert 5 songs
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

// d) All songs (count is shown by index.html)
app.get("/all", async (req, res) => {
  res.json(await Song.find());
});

// e) By music director
app.get("/director/:name", async (req, res) => {
  res.json(await Song.find({ music_director: req.params.name }));
});

// f) By music director + singer
app.get("/director/:dir/singer/:singer", async (req, res) => {
  res.json(await Song.find({
    music_director: req.params.dir,
    singer: req.params.singer
  }));
});

// g) Delete a song
app.get("/delete/:name", async (req, res) => {
  await Song.deleteOne({ songname: req.params.name });
  res.send("Deleted");
});

// h) Add a favourite song
app.get("/add/:song/:film/:dir/:singer", async (req, res) => {
  await Song.create({
    songname: req.params.song,
    film: req.params.film,
    music_director: req.params.dir,
    singer: req.params.singer
  });
  res.send("Added");
});

// i) By singer + film
app.get("/singer/:singer/film/:film", async (req, res) => {
  res.json(await Song.find({
    singer: req.params.singer,
    film: req.params.film
  }));
});

// j) Update: add actor and actress
app.get("/update/:name", async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },
    { $set: { actor: "Actor1", actress: "Actress1" } }
  );
  res.send("Updated");
});

app.listen(3000);
