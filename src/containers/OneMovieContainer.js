import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OneMovie from "../components/OneMovie";

class OneMovieContainer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <OneMovie />
        <Footer />
      </div>
    );
  }
}

export default OneMovieContainer;
