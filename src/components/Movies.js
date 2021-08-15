import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getMovies } from "../store/movies";
import { setMovieId } from "../store/onemovie";
import { loginUser } from "../store/users";

export default function Movies() {
  const dispatch = useDispatch();
  const inputMovies = useSelector((state) => state.oneMovie);
  //console.log(state.movies);
  const allMovies = useSelector((state) => state.movies).Search;
  let user = useSelector((state) => state.users);

  useEffect(() => {
    getMovies(inputMovies);
  }, [inputMovies]);

  //set state of the IMBD selected movie
  const handleClick = (e) => {
    dispatch(setMovieId(e));
  };


  const addFavorites = (e) => {
    //obtengo toda la inforamacion de la pelicula al hacer click
    let auxFavs = user.favs.map((x) => x.imdbID).includes(e.imdbID);
    if (!auxFavs) {
      dispatch(loginUser({ ...user, favs: [...user.favs, e] }));
      axios.post("/api/favorites/user", { e, user });
    }
  };

  const removeFavorites = (e) => {
    console.log("llegue al sacar favorites");
    let favsRemain = [...user.favs].filter((x) => x.imdbID !== e.imdbID);
    dispatch(loginUser({ ...user, favs: favsRemain }));
  };

  return (
    <div className="moviesDiv">
      <div className="moviesOutside">
        {allMovies === undefined ? (
          <h1 style={{ color: "white" }}>
            Ingresar una pelicula en la barra de búsqueda
          </h1>
        ) : (
          Object.keys(allMovies).map((value) => {
            return (
              <div key={value}>
                <Link
                  to={`/movies/${allMovies[value].imdbID}`}
                  onClick={() => handleClick(allMovies[value].imdbID)}
                >
                  <div className="moviesOneMovie">
                    <h3>{allMovies[value].Title}</h3>
                    <img
                      src={allMovies[value].Poster}
                      alt={allMovies[value].Title}
                    />
                  </div>
                </Link>
                {user.status === "LOGGED_IN" &&
                (user.favs.length === 0 ||
                  !user.favs
                    .map((x) => x.imdbID)
                    .includes(allMovies[value].imdbID)) ? (
                  <div className="addFavoritesDivOutside">
                    <div
                      className="addFavoritesDiv"
                      onClick={() => addFavorites(allMovies[value])}
                    >
                      Agregar a favoritos
                    </div>
                  </div>
                ) : user.status === "LOGGED_IN" &&
                  user.favs
                    .map((x) => x.imdbID)
                    .includes(allMovies[value].imdbID) ? (
                  <div className="addFavoritesDivOutside">
                    <div
                      className="addFavoritesDiv"
                      onClick={() => removeFavorites(allMovies[value])}
                    >
                      En favoritos. Clickea para sacar
                    </div>
                  </div>
                ) : (
                  <div className="addFavoritesDivOutside">
                    <div className="logToAddDiv">Loggearse para anadir</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
