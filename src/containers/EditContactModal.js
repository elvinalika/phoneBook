import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class EditContactModal extends Component {
  state = {
    contact: null
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.id && this.props.id)
      axios
        .get("http://localhost:3000/contacts/" + this.props.id)
        .then(response => {
          this.setState({
            ...this.state,
            contact: response.data
          });
        })
        .catch(error => {
          alert(error);
        });
  }

  inputHandler = event => {
    this.setState({
      ...this.state,
      contact: {
        ...this.state.contact,
        [event.target.name]: event.target.value
      }
    });
  };

  edit = () => {
    axios
      .put(
        "http://localhost:3000/contacts/" + this.props.id,
        this.state.contact
      )
      .then(() => {
        this.props.toggle(null, true);
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit contact</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                value={this.state.contact && this.state.contact.firstname}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                value={this.state.contact && this.state.contact.lastname}
                onChange={this.inputHandler}
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Type</legend>
              <div className="row">
                <div className="col-md-4">
                  <FormGroup check>
                    <Label check>
                      <Input
                        checked={
                          this.state.contact &&
                          this.state.contact.type === "Cellphone"
                        }
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
                        checked={
                          this.state.contact &&
                          this.state.contact.type === "Work"
                        }
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
                        checked={
                          this.state.contact &&
                          this.state.contact.type === "Home"
                        }
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
              <Input
                type="text"
                name="number"
                id="number"
                value={this.state.contact && this.state.contact.number}
                onChange={this.inputHandler}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.edit}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditContactModal;
