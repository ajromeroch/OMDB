import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router";
import LandingPageContainer from "./LandingPageContainer";
import MoviesContainer from "./MoviesContainer";
import OneMovieContainer from "./OneMovieContainer";
import UserLoginContainer from "./UserLoginContainer";
import UserCreation from "../components/UserCreation";
import Favorites from "../components/Favorites";
import { loginUser } from "../store/users";
import axios from "axios";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("entro al mount");
    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => {
        console.log("user from mount", user);
        dispatch(loginUser({ email: user.email, status: "LOGGED_IN" }));
      })
      .catch((err) => err);
  }, []);


  return (
    <div>
      <Switch>
        <Route exact path="/movies" component={MoviesContainer} />
        <Route path="/movies/:movieId" component={OneMovieContainer} />
        <Route path="/login" component={UserLoginContainer} />
        <Route path="/register" component={UserCreation} />
        <Route path="/favs" component={Favorites} />
        <Route path="/" component={LandingPageContainer} />
      </Switch>
    </div>
  );
};


