import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/users";
import axios from "axios";

export default function UserLogin() {
  //hacer las validaciones correspondientes cuando este mas avanzado
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Sending information to the database to see if we already have him/her on data base
    const { email, password } = e.target;

    axios
      .post("api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        history.push("/movies");
        alert("Usuario loggeado correctamente");
        //console.log("response", data);
        //        dispatch(loginUser(data.email));
        dispatch(
          loginUser({ email: data.email, status: "LOGGED_IN", favs: [] })
        );

        return data;
        //console.log("res del login", res)
      })
      .catch((err) => {
        alert("Usuario/Password incorrecto, intentar nuevamente");
        return err;
      });
  };

  return (
    <div className="userLoginDiv">
      <div className="userLoginOutside">
        <div className="userLoginInside">
          <form
            className="userCreationForm"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Correo:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Insertar email"
            />
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insertar password"
            />
            <br />
            <br />
            <div className="userCreationSubmitButtonDiv">
              <input
                className="userCreationSubmitButton"
                type="submit"
                value="Ingresar"
                disabled={false}
              />
            </div>
          </form>
          <br />
        </div>
        <div className="userLoginRegisterButton">
          <Link to="/register">
            <button className="userCreationSubmitButton">Registrate</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
