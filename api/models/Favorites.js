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

module.exports = Favorites;
