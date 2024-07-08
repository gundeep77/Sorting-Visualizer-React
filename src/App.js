import React from "react";
import Visualizer from "./components/visualizer";
import "./App.css";
import Footer from "./footer";

class App extends React.Component {
  render() {
    return (
      <>
        <Visualizer />
        <Footer />
      </>
    );
  }
}

export default App;
