import { createAction, createReducer } from "@reduxjs/toolkit";

//export const setMovie = createAction("setMovie")

export const loginUser = createAction("loginUser");
export const logoutUser = createAction("logoutUser");

// , (user) => {
//   //obtiene al usuario
//   if (!user) return;
//   return axios
//     .post("/api/users/login", {
//       email: user.email,
//       password: user.password,
//     })
//     .then(({ data }) => data)
//     .catch((err) => {

//       console.log("el error es", err.request);
//       return err;
//     });
// });

export const usersReducer = createReducer([], {
  //[setMovie]: (state, action) => action.payload,
  [loginUser]: (state, action) => action.payload,
  //porque esto no funciona??
  //[logoutUser]: (state, action) => (state = []),
  //[loginUser.fulfilled]: (state, action) => action.payload,
});
