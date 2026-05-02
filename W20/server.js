const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/employees");

const Employee = mongoose.model("Employee", {
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joining_date: String
});

// Seed sample employees
app.get("/insert", async (req, res) => {
  await Employee.insertMany([
    { name: "John", department: "IT", designation: "Dev", salary: 50000, joining_date: "2024-01-01" },
    { name: "Jane", department: "HR", designation: "Manager", salary: 60000, joining_date: "2023-05-15" }
  ]);
  res.send("Inserted");
});

// Add a new employee
app.get("/add/:name/:dept/:desig/:salary/:date", async (req, res) => {
  await Employee.create({
    name: req.params.name,
    department: req.params.dept,
    designation: req.params.desig,
    salary: req.params.salary,
    joining_date: req.params.date
  });
  res.send("Added");
});

// View all
app.get("/all", async (req, res) => {
  res.json(await Employee.find());
});

// Update salary by name
app.get("/update/:name/:salary", async (req, res) => {
  await Employee.updateOne(
    { name: req.params.name },
    { $set: { salary: req.params.salary } }
  );
  res.send("Updated");
});

// Delete by name
app.get("/delete/:name", async (req, res) => {
  await Employee.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

app.listen(3000);
