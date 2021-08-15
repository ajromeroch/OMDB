import { createAction, createReducer } from "@reduxjs/toolkit";


export const loginUser = createAction("loginUser");
export const logoutUser = createAction("logoutUser");


export const usersReducer = createReducer([], {
  [loginUser]: (state, action) => action.payload,

});
