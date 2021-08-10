import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LandingBody from "../components/LandingBody";

class LandingPageContainer extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <LandingBody />
        <Footer />
      </div>
    );
  }
}

export default LandingPageContainer;
