import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { loginUser } from "../store/users";

export default function Favorites() {
  let user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const removeFavorites = (e) => {
    let favsRemain = [...user.favs].filter((x) => x.imdbID !== e.imdbID);
    dispatch(loginUser({ ...user, favs: favsRemain }));
  };

  return (
    <div>
      <Navbar />
      <div className="favoritesDiv">
        <div className="favoritesDivOutside">
          {user.favs === undefined || user.favs.length === 0 ? (
            <h1>El usuario no tiene favoritos</h1>
          ) : (
            user.favs.map((x, index) => {
              return (
                <div key={index} className="favoritesDivInside">
                  <img src={x.Poster} alt={x.Title} />
                  <div className="favoritesDivInsideTitle">{x.Title}</div>
                  <div className="favoritesDivContainerButton">
                    <button
                      className="favoritesDivInsideButton"
                      onClick={() => removeFavorites(x)}
                    >
                      Remover de favoritos
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </div>
  );
}
