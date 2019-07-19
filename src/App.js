import React from "react";
import "./App.scss";
import Layout from "./layout/Main";
import "samim-font/dist/font-face.css";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
