// require('dotenv').config(); u can write it here or in package.json (scripts),
//  to add env file functionality. normally vite does it automatically in frontend
const express = require("express");
const app = express();
const dbPool = require("./db/pgClient");
const { getAllFilms, getSingleFilm } = require("./controllers/filmControllers");
const cors = require("cors");

const port = process.env.PORT || 7000;

const corsOptions = {
    origin: 'http://localhost:7000', // Reemplaza esto con la URL de tu frontend local
    optionsSuccessStatus: 200 // Algunos navegadores requieren esta opción
};


app.use(cors(corsOptions));

console.log(process.env);
// to see in terminal all the credentials added in env file

app.get("/", (req, res) => res.send("Welcome to the films API"));

app.route("/films").get(getAllFilms);
app.route("/films/:id").get(getSingleFilm);

app.get('/search', async (req, res) => {
    try {
    const { query } = req.query 
    const { rows } = await pool.query(
        'SELECT * FROM films WHERE title=%$1% OR description=%$1% OR director=%$1% OR release_year=%$1%',
        [query])
    return res.json(rows)
    } catch (error) {
    return res.status(500).json({ error: error.message })
    }
});

app.listen(port, () => console.log("Welcome"));
