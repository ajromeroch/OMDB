import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setMovieId } from "../store/onemovie";

export default function LandingBody() {
  const [landing, setLanding] = useState({});
  const auxiliar = [
    "Batman",
    "Superman",
    "Rambo",
    "Rocky",
    "Back to the Future",
    "Godzilla",
    "Saw",
    "King Kong",
  ];

  const dispatch = useDispatch();

  let auxNum = Math.round(Math.random() * (auxiliar.length - 1));
  let auxDisplay = [0, 1, 2, 3];

  //set state of the IMBD selected movie
  const handleClick = (e) => {
    //console.log(e);
    dispatch(setMovieId(e));
  };

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?apikey=20dac387&s=" + auxiliar[auxNum]) //
      .then(({ data }) => {
        setLanding({ name: auxiliar[auxNum], data: data.Search, auxDisplay });
      });
  }, []);

  return (
    <div className="landingPage">
      {Object.keys(landing).length === 0 ? null : (
        <div className="landingPageOutside">
          <div className="landingPageTitle">
            <h1> Semana de {landing.name}</h1>
          </div>
          <div className="landingPageImageDiv">
            <div className="landingPageImage">
              {landing.auxDisplay.map((value) => {
                return (
                  <Link
                    key={value}
                    to={`/movies/${landing.data[value].imdbID}`}
                    onClick={() => handleClick(landing.data[value].imdbID)}
                  >
                    <img
                      src={landing.data[value].Poster}
                      alt={`${landing.data[value].Title}`}
                    />
                  </Link>
                );
              })}
              {/* <img
                src={landing.data[1].Poster}
                alt={`${landing.data[1].Title}`}
              />
              <img
                src={landing.data[2].Poster}
                alt={`${landing.data[2].Title}`}
              />
              <img
                src={landing.data[3].Poster}
                alt={`${landing.data[3].Title}`}
              /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
