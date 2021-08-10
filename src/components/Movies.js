import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getMovies } from "../store/movies";
import { setMovieId } from "../store/onemovie";
import { loginUser } from "../store/users";

//disyuntiva. Soy en teoria capaz de traer un dispatch y cambiar el estado en redux,
//pero tengo que hacerlo? deberia usar un estado local en este caso dado que quiero renderizar
//todas las peliculas que seleccione?

export default function Movies() {
  const dispatch = useDispatch();
  const inputMovies = useSelector((state) => state.oneMovie);
  //console.log(state.movies);
  const allMovies = useSelector((state) => state.movies).Search;
  let user = useSelector((state) => state.users);

  useEffect(() => {
    //dispatch(getMovies(inputMovies))
    getMovies(inputMovies);
    // .then(data => {
    //   //Checks for existence and good responses
    //   if(!data.payload || data.payload.Response === "False") return;
    //   //Destructures and sets an OBJECT into LocalMovies
    //   let {Search} = data.payload
    // })
  }, [inputMovies]);

  //set state of the IMBD selected movie
  const handleClick = (e) => {
    dispatch(setMovieId(e));
  };

  ///problema!! no le llega el user antes de que vuelva a renderizar!!

  const addFavorites = (e) => {
    //obtengo toda la inforamacion de la pelicula al hacer click

    //aca ver el tema de no agregar repetidos
    let auxFavs = user.favs.map((x) => x.imdbID).includes(e.imdbID);
    if (!auxFavs) {
      dispatch(loginUser({ ...user, favs: [...user.favs, e] }));
      axios.post("/api/favorites/user", { e, user });
    }
  };

  const removeFavorites = (e) => {
    //obtengo toda la inforamacion de la pelicula al hacer click
    // {Title: "Batman Begins", Year: "2005", imdbID: "tt0372784", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2…zQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}
    //obj = {...obj, 'c': 5}
    // console.log("user on click", e);
    console.log("llegue al sacar favorites");
    let favsRemain = [...user.favs].filter((x) => x.imdbID !== e.imdbID);
    dispatch(loginUser({ ...user, favs: favsRemain }));
  };

  //hacer esto me corre un loop infinito en el console log
  //console.log("llegue a allMOVIES", allMovies);
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
