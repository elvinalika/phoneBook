import React, { Component } from "react";
import img from "../images/foto1.png";
import { Col, Row } from "reactstrap";

class Homepage extends Component {
  render() {
    return (
      <Row>
        <Col style={{textAlign: "center", paddingTop: "10%", paddingBottom:"10%"}}>
          <h3>Welcome</h3>
          <h3>to your</h3>
          <h3>phonebook!</h3>
        </Col>
        <Col>
          <img src={img} alt="Phonebook" style={{height:"85%"}}/>
        </Col>
      </Row>
    );
  }
}

export default Homepage;
