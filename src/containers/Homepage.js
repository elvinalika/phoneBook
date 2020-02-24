import React, { Component } from "react";
import img from "../images/foto1.png";

class Homepage extends Component {
  render() {
    return (
      <div className="row">
        <div
          className="col"
          style={{
            textAlign: "center",
            paddingTop: "10%",
            paddingBottom: "10%"
          }}
        >
          <h3>Welcome to your phonebook!</h3>
        </div>
        <div className="col">
          <img src={img} alt="Phonebook" style={{ height: "85%" }} />
        </div>
      </div>
    );
  }
}

export default Homepage;
