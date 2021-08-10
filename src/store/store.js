import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { moviesReducer } from "./movies";
import { oneMovieReducer } from "./onemovie";
import { usersReducer } from "./users";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    oneMovie: oneMovieReducer,
    users: usersReducer,
  },
});

export default store;
