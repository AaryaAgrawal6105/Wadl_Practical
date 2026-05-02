const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/student");

const Student = mongoose.model("Student", {
  name: String,
  roll_no: Number,
  WAD: Number,
  CC: Number,
  DSBDA: Number,
  CNS: Number,
  AI: Number
});

// c) Insert students
app.get("/insert", async (req, res) => {
  await Student.insertMany([
    { name: "A", roll_no: 1, WAD: 25, CC: 27, DSBDA: 30, CNS: 28, AI: 29 },
    { name: "B", roll_no: 2, WAD: 20, CC: 18, DSBDA: 15, CNS: 22, AI: 19 },
    { name: "C", roll_no: 3, WAD: 30, CC: 30, DSBDA: 28, CNS: 30, AI: 30 },
    { name: "D", roll_no: 4, WAD: 35, CC: 38, DSBDA: 22, CNS: 39, AI: 36 },
    { name: "E", roll_no: 5, WAD: 38, CC: 32, DSBDA: 18, CNS: 28, AI: 35 }
  ]);
  res.send("Inserted");
});

// d) All students (count is computed on the page)
app.get("/all", async (req, res) => {
  res.json(await Student.find());
});

// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
  res.json(await Student.find({ DSBDA: { $gt: 20 } }));
});

// f) Update specific student's marks by +10 in every subject
app.get("/update/:name", async (req, res) => {
  await Student.updateOne(
    { name: req.params.name },
    { $inc: { WAD: 10, CC: 10, DSBDA: 10, CNS: 10, AI: 10 } }
  );
  res.send("Updated");
});

// g) > 25 in ALL subjects
app.get("/topper", async (req, res) => {
  res.json(await Student.find({
    WAD: { $gt: 25 },
    CC: { $gt: 25 },
    DSBDA: { $gt: 25 },
    CNS: { $gt: 25 },
    AI: { $gt: 25 }
  }));
});

// h) < 40 in BOTH DSBDA and CNS (PDF said Maths/Science — schema has no such fields)
app.get("/weak", async (req, res) => {
  res.json(await Student.find({
    DSBDA: { $lt: 40 },
    CNS: { $lt: 40 }
  }));
});

// i) Delete a student
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

app.listen(3000);
