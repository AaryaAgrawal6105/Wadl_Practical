const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/student");
app.use(express.static("public"));
const studentSchema = new mongoose.Schema({
  name: String,
  roll_no: Number,
  WAD: Number,
  DSBDA: Number,
  CNS: Number,
  CC: Number,
  AI: Number
});

const Student = mongoose.model("Student", studentSchema);

// INSERT
app.get("/insert", async (req, res) => {
  await Student.insertMany([
    { name: "A", roll_no: 1, WAD: 25, DSBDA: 30, CNS: 28, CC: 27, AI: 29 },
    { name: "B", roll_no: 2, WAD: 20, DSBDA: 15, CNS: 22, CC: 18, AI: 19 }
  ]);
  res.send("Inserted");
});

// >20 DSBDA
app.get("/dsbda", async (req, res) => {
  res.json(await Student.find({ DSBDA: { $gt: 20 } }));
});

// UPDATE +10
app.get("/update", async (req, res) => {
  await Student.updateMany({}, { $inc: { WAD: 10 } });
  res.send("Updated");
});

// DELETE
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

app.listen(3000);