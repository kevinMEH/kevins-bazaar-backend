// The path is relative to the path node is started in.
// We are running node from project root.
require("dotenv").config({ path: "./config.env"});

const express = require("express");
const cors = require("cors");
const database = require("./database/connection");

const PORT = process.env.PORT || 80;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"))

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send("Server Unavailable")
});

database.connectToServer((error = false) => {
    if(error) {
        console.error(error);
        process.exit();
    }
    
    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    });
});