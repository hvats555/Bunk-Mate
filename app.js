const express = require("express");

app = express();

app.get("/", (req, res) => {
    res.send("It is working");
});

app.listen(3000, () => {
    console.log("Server is running")
});