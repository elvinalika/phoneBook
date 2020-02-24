import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import Header from "../header/Header";
import ContactList from "../containers/ContactList";
import CreateContact from "../containers/CreateContact";
import Homepage from "../containers/Homepage";

class Routes extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <br />
        <Route path="/" exact component={Homepage} />
        <Route path="/contacts" component={ContactList} />
        <Route path="/createContact" component={CreateContact} />
      </div>
    );
  }
}

export default Routes;
