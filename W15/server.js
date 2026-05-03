const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }))
app.use(express.static("public"));

app.get("/api/products", (req, res) => {
    const data = fs.readFileSync("products.json");
    res.json(JSON.parse(data));
});

app.listen(3000, () => console.log("Server running on 3000"));