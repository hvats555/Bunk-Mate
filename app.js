const express = require("express");
let app = express();

require("./startup/db")();
require("./startup/routes")(app);

let port = process.env.port | 3000;

let server = app.listen(port, () => {
    console.log(`Server is happily running on port : ${port}`);
});

module.exports = server;