import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Movies from "../components/Movies";

class MoviesContainer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Movies />
        <Footer />
      </div>
    );
  }
}

export default MoviesContainer;
