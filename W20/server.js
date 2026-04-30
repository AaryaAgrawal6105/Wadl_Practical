const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employees");

const empSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joining_date: String
});

const Employee = mongoose.model("Employee", empSchema);

// CREATE
app.post("/add", async (req, res) => {
  await Employee.create(req.body);
  res.send("Added");
});

// READ
app.get("/all", async (req, res) => {
  res.json(await Employee.find());
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(3000);