const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));

app.get("/api/users", (req, res) => {
    const data = fs.readFileSync("users.json");
    res.json(JSON.parse(data));
});

app.listen(3000, () => console.log("Server running on 3000"));