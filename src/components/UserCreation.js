import React from "react";
import { useHistory } from "react-router";
import axios from "axios";


export default function UserCreation() {


  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    //Getting the information of the users
    const { email, password } = e.target;
    //Sending information to the database to see create the user
    axios
      .post("api/users/register", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        console.log("data", data);
        alert(`usuario ${data.email} creado correctamente`);
        history.push("/login");
        return data;
      })
      .catch((err) => {
        console.log(err);
        console.log(`Error ${err.message}`);
      });


  };

  return (
    <div className="userCreationDiv">
      <div className="userCreationInside">
        <form
          autoComplete="off"
          className="userCreationForm"
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
              value="Registrar"
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
