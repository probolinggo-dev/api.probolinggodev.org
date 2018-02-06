const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Halo arek-arek probolinggo!"));

app.listen(3000, () => console.log("Server mendengarkan pada port 3000!"));
