const S = require("sequelize");
const db = require("../config/db");

class Favorites extends S.Model {}

Favorites.init(
  {
    Title: S.STRING,
    Year: S.INTEGER,
    imdbID: S.STRING,
    Type: S.STRING,
    Poster: S.STRING,
  },
  { sequelize: db, modelName: "favorite" }
);

// {Title: "Batman Begins", Year: "2005", imdbID: "tt0372784", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2…zQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}

module.exports = Favorites;
