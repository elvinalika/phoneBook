import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledAlert
} from "reactstrap";
import * as actions from "../API/ManageContacts";

class CreateContact extends Component {
  state = {
    contact: {
      firstname: "",
      lastname: "",
      type: "Cellphone",
      number: ""
    },
    alert: false,
    msg: ""
  };

  create = event => {
    event.preventDefault();
    let msg = actions.createNewContact(this.state.contact);
    this.setState({
      ...this.state,
      contact: {
        ...this.state.contact,
        firstname: "",
        lastname: "",
        type: "Cellphone",
        number: ""
      },
      alert: true,
      msg: msg
    });
  };

  inputHandler = event => {
    console.log(event.target.value);
    this.setState({
      ...this.state,
      contact: {
        ...this.state.contact,
        [event.target.name]: event.target.value
      },
      alert: false,
      msg: ""
    });
  };

  render() {
    let alert = this.state.alert ? (
      <UncontrolledAlert
        color={
          this.state.msg === "The contact is already on the list!"
            ? "warning"
            : "success"
        }
      >
        {this.state.msg}
      </UncontrolledAlert>
    ) : null;
    return (
      <div className="divStyle">
        {alert}
        <Form onSubmit={this.create}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Firstname</Label>
                <Input
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={this.state.contact.firstname}
                  onChange={this.inputHandler}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Lastname</Label>
                <Input
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={this.state.contact.lastname}
                  onChange={this.inputHandler}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup tag="fieldset" required>
            <legend>Type</legend>
            <Row>
              <Col md={4}>
                <FormGroup check>
                  <Label check>
                    <Input
                      checked
                      type="radio"
                      name="type"
                      value="Cellphone"
                      onChange={this.inputHandler}
                    />
                    Cellphone
                  </Label>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="Work"
                      onChange={this.inputHandler}
                    />
                    Work
                  </Label>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="Home"
                      onChange={this.inputHandler}
                    />
                    Home
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Number</Label>
            <Input
              required
              type="text"
              name="number"
              id="number"
              value={this.state.contact.number}
              onChange={this.inputHandler}
            />
          </FormGroup>
          <Button>Create</Button>
        </Form>
      </div>
    );
  }
}

export default CreateContact;
