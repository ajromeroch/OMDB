import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMovie = createAction("setMovie")
export const setMovieId = createAction("setMovieId")

export const oneMovieReducer = createReducer([], {
  [setMovie]: (state, action) => action.payload,
  [setMovieId]: (state, action) => action.payload,
});
