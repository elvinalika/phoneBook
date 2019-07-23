import React, { Component } from "react";
import "../App.css";
import Header from "../header/Header";
import ContactList from "../body/ContactList";
import { Route } from "react-router-dom";
import OrderedContactList from "../body/OrderedContactList";
import CreateContact from "../body/CreateContact";
import Homepage from "../body/Homepage";

class Routes extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <br />
        <Route path="/" exact component={Homepage} />
        <Route path="/contacts" component={ContactList} />
        <Route path="/orderedContacts" component={OrderedContactList} />
        <Route path="/createContact" component={CreateContact} />
      </div>
    );
  }
}

export default Routes;
