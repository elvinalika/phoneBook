import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
