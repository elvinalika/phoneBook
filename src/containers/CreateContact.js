import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledAlert
} from "reactstrap";
import InputField from "../components/InputField";
import axios from "axios";

class CreateContact extends Component {
  state = {
    contact: {
      firstname: "",
      lastname: "",
      type: "Cellphone",
      number: ""
    },
    errors: {},
    alert: false,
    msg: ""
  };

  validate = () => {
    const errors = {};
    if (!this.state.contact.firstname) {
      errors.firstname = "Firstname is required.";
    }
    if (!this.state.contact.lastname) {
      errors.lastname = "Lastname is required.";
    }
    if (!this.state.contact.number) {
      errors.number = "Number is required.";
    }
    return errors;
  };

  create = event => {
    event.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3000/contacts", this.state.contact)
        .then(response => {
          console.log(response);
          this.setState({
            ...this.state,
            contact: {
              ...this.state.contact,
              firstname: "",
              lastname: "",
              type: "Cellphone",
              number: ""
            },
            msg: "Contact was added succesfully.",
            alert: true
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            msg: "We are sorry, there has been a server error.",
            alert: true
          });
        });
    } else {
      this.setState({
        errors: errors
      });
    }
  };

  inputHandler = event => {
    this.setState({
      ...this.state,
      contact: {
        ...this.state.contact,
        [event.target.id]: event.target.value
      },
      alert: false,
      msg: "",
      errors: {}
    });
  };

  render() {
    let alert = this.state.alert ? (
      <UncontrolledAlert
        color={
          this.state.msg === "Contact was added succesfully."
            ? "success"
            : "danger"
        }
      >
        {this.state.msg}
      </UncontrolledAlert>
    ) : null;
    return (
      <div className="divStyle">
        {alert}
        <Form onSubmit={this.create}>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="name">Firstname</Label>
                <InputField
                  id="firstname"
                  onChange={this.inputHandler}
                  value={this.state.contact.firstname}
                  error={this.state.errors.firstname}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="examplePassword">Lastname</Label>
                <InputField
                  id="lastname"
                  onChange={this.inputHandler}
                  value={this.state.contact.lastname}
                  error={this.state.errors.lastname}
                />
              </FormGroup>
            </div>
          </div>
          <FormGroup tag="fieldset" required>
            <legend>Type</legend>
            <div className="row">
              <div className="col-md-4">
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
              </div>
              <div className="col-md-4">
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
              </div>
              <div className="col-md-4">
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
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Number</Label>
            <InputField
              id="number"
              onChange={this.inputHandler}
              value={this.state.contact.number}
              error={this.state.errors.number}
            />
          </FormGroup>
          <Button>Create</Button>
        </Form>
      </div>
    );
  }
}

export default CreateContact;
