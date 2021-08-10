import {createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

//export const setMovie = createAction("setMovie")

export const getMovies = createAsyncThunk("getMovies", (title) => {
  //obtiene todas las peliculas
  if(!title) return

  return axios
    .get("https://www.omdbapi.com/?apikey=20dac387&s=" + title)
    .then(({ data }) => data);
});

export const getMoviesById = createAsyncThunk("getMovies", (id) => {
  //obtiene todas las peliculas
  if(!id) return

  return axios
    .get("https://www.omdbapi.com/?apikey=20dac387&plot=full&i=" + id)
    .then(({ data }) => data);
});

export const moviesReducer = createReducer([], {
  //[setMovie]: (state, action) => action.payload,
  [getMovies.fulfilled]: (state, action) => action.payload,
  [getMoviesById.fulfilled]: (state, action) => action.payload,
});
