import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getMoviesById } from "../store/movies";
import { setMovie } from "../store/onemovie";

export default function OneMovie() {
  //aca necesito que se guarde la SELECCION de pelicula y poder
  //renderizar la informacion completa de la pelicula

  //selected movie como PARAMETRO/PROPS y de ahi sacar toda la info
  //desde la pagina
  const dispatch = useDispatch();
  const location = useLocation();

  let movie = useSelector((state) => state.oneMovie);
  //Getting all the info of the individual movie selected into the REDUX database. Using useffect to load once into REDUX store

  useEffect(() => {
    //Managing the reload response. Getting the IMBD from the URL
    if (movie.length === 0) {
      const aux = location.pathname.split("/");
      movie = aux[aux.length - 1];
    }
    //elegir el id de la mierda que esta en el url
    dispatch(getMoviesById(movie)).then((data) =>
      dispatch(setMovie(data.payload))
    );
  }, []);

  const theMovie = useSelector((state) => state.oneMovie);
  console.log(theMovie);
  //console.log(theMovie)
  return (
    <div className="oneMovieDiv">
      <div className="oneMovieOutside">
        <div className="oneMovieTitleDiv">
          <div className="oneMovieTitleInside">
            <h1>{theMovie.Title}</h1>
          </div>
          <div className="oneMovieSubtitleDiv">
            <h5>{theMovie.Year}</h5>
            <h5>{theMovie.Rated}</h5>
            <h5>{theMovie.Runtime}</h5>
          </div>
        </div>
        <div className="oneMovieImagePlot">
          <div>
            <img src={theMovie.Poster} />
          </div>
          <div className="oneMoviePlot">
            <p>{theMovie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
