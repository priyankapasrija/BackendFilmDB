const express = require("express");
const app = express();
const dbPool = require("./db/pgClient");
const { getAllFilms, getSingleFilm } = require("./controllers/filmControllers");
const cors = require("cors");

const port = process.env.PORT || 7000;
app.use(cors());

app.get("/", (req, res) => res.send("Welcome to the films API"));

app.route("/films").get(getAllFilms);
app.route("/films/:id").get(getSingleFilm);

app.listen(port, () => console.log("Welcome"));
