import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { getMovies } from "../store/movies";
import { setMovie } from "../store/onemovie";
import { loginUser } from "../store/users";

//PROBLEMA DE COMO FUNCIONA EL DROPDOWN AL MOMENTO DE APRETAR, TENGO QUE APRETAR EL ENTER PARA QUE FUNCIONE

export default function Navbar() {
  //Creating a local state to handle the datalist and all the movies displayed
  const [localMovies, setLocalMovies] = useState({});
  const [oneMovie, setOneMovie] = useState("");

  //Getting the user in case it is logged
  let user = useSelector((state) => state.users);
  console.log("este es el user", user);

  //Defining dispatch to set the movie state
  const dispatch = useDispatch();
  //let selectedMovie = useSelector((state) => state.movies)

  //Defining history to redirect pages
  const history = useHistory();

  //Changing the global state only when submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setMovie(oneMovie));
    e.target.value = "";
    history.push("/movies");
  };

  //Setting all changes to the local state for it to be submitted and getAllMovies on every change
  const handleChange = (e) => {
    //console.log(e.nativeEvent)
    let { value } = e.target;
    setOneMovie(value);
    //if(e.nativeEvent.data === undefined) handleSubmit(e);
  };

  const handleLogout = () => {
    console.log("click aca");
    console.log("user salio?", user);
    // Turning react state to null
    dispatch(loginUser({ email: "", status: "NOT_LOGGED_IN", favs: [] }));
    // Leaving passport session as well
    axios
      .post("api/users/logout")
      .then((res) => {
        alert("Usuario desloggeado correctamente");
        //user = [];
        history.push("/");
        return res;
      })
      .catch((err) => err);
  };

  //When selecting an item from dataList, the e.nativeData.data goes to 'undefinded' (null when erasing, that's why I set it to undefined)
  // const toogleSubmit = (e) => {
  //   return e.nativeEvent.data === undefined
  // }

  useEffect(() => {
    dispatch(getMovies(oneMovie)).then((data) => {
      //Checks for existence and good responses
      if (!data.payload || data.payload.Response === "False") return;
      //Destructures and sets an OBJECT into LocalMovies
      let { Search } = data.payload;
      setLocalMovies(Search);
    });
  }, [oneMovie]);

  return (
    <div className="navbar">
      <div className="navbarInside">
        <div>
          <Link to="/">
            <img
              className="logo"
              src="https://portalbuzzuserfiles.s3.amazonaws.com/ou-18967/userfiles/images/movies%20website%20image%20use.jpg"
              alt="logo"
              height="45px"
              width="110px"
            />
          </Link>
        </div>
        <div className="divInput">
          <form className="formInput" onSubmit={handleSubmit}>
            <input
              className="movieInput"
              list="movieOption"
              onChange={handleChange}
              placeholder="Busca una pelicula..."
            />
            <datalist id="movieOption">
              {oneMovie === "" ? (
                <option></option>
              ) : (
                Object.keys(localMovies).map((value) => (
                  <option key={value}>{localMovies[value].Title}</option>
                ))
              )}
            </datalist>
          </form>
        </div>
        <div className="navbarLoginButton">
          {user.status === "LOGGED_IN" ? (
            <div>
              <button className="loginButton" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/favs">
                <button className="loginButton">Favoritos</button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="loginButton">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
