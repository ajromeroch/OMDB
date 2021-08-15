import {createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getMovies = createAsyncThunk("getMovies", (title) => {
  if(!title) return

  return axios
    .get("https://www.omdbapi.com/?apikey=20dac387&s=" + title)
    .then(({ data }) => data);
});

export const getMoviesById = createAsyncThunk("getMovies", (id) => {
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
