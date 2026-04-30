const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));

app.get("/api/employees", (req, res) => {
    const data = fs.readFileSync("employees.json");
    res.json(JSON.parse(data));
});

app.listen(3000);