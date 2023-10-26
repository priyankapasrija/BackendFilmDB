const dbPool = require("../db/pgClient");

const getAllFilms = async (req, res) => {
  try {
    const { rows } = await dbPool.query(
      `SELECT movie_id, filmname, description, director, rating, year, imagesrc, trailer_url, genre FROM films;`
    );

    return res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getSingleFilm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!+id) return res.status(400).json({ error: "Id must be a number" });

    const {
      rows: [oneFilm],
    } = await dbPool.query(
      `SELECT  movie_id, filmname, description, director, rating, year, imagesrc, trailer_url, genre FROM films WHERE movie_id=$1`,
      [id]
    );

    if (!oneFilm)
      return res.status(404).json({ error: "Movie could not be found" });

    res.json(oneFilm);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFilms,
  getSingleFilm,
};
