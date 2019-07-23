import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import * as actions from "../API/ManageContacts";
import { orderBy } from "lodash";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      contacts: [],
      editingElement: {
        id: null,
        firstname: "",
        lastname: "",
        type: "",
        number: ""
      }
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(id) {
    if (this.state.modal === false) {
      let contact = actions.getOneContact(id);
      this.setState({
        ...this.state,
        editingElement: {
          ...this.state.editingElement,
          id: id,
          firstname: contact.firstname,
          lastname: contact.lastname,
          type: contact.type,
          number: contact.number
        }
      });
    } else {
      this.setState({
        ...this.state,
        editingElement: {
          id: null,
          firstname: "",
          lastname: "",
          type: "",
          number: ""
        }
      });
    }
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      contacts: actions.getContacts()
    });
  }

  delete = id => {
    let updatedContacts = actions.deleteContact(id);
    this.setState({
      ...this.state,
      contacts: updatedContacts
    });
  };

  edit = () => {
    let updatedContacts = actions.editContact(this.state.editingElement);
    this.setState({
      ...this.state,
      contacts: updatedContacts,
      modal: !this.state.modal
    });
  };

  inputHandler = event => {
    this.setState({
      ...this.state,
      editingElement: {
        ...this.state.editingElement,
        [event.target.name]: event.target.value
      }
    });
  };

  sortByFirstname = () => {
    this.setState({
      ...this.state,
      contacts: orderBy(this.state.contacts, ["firstname"])
    });
  };

  sortByLastname = () => {
    this.setState({
      ...this.state,
      contacts: orderBy(this.state.contacts, ["lastname"])
    });
  };

  render() {
    let contacts = this.state.contacts
      ? this.state.contacts.map(el => {
          return (
            <tr key={el.id}>
              <td>
                {el.firstname} {el.lastname}
              </td>
              <td> {el.type} </td>
              <td> {el.number} </td>
              <td>
                <Button outline  color="primary" onClick={() => this.toggle(el.id)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button outline color="danger" onClick={() => this.delete(el.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })
      : null;
    return (
      <div className="divStyle">
        <UncontrolledButtonDropdown nav inNavbar>
          <DropdownToggle color="success" caret>
            Order list
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.sortByFirstname}>By firstname</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.sortByLastname}>By lastname</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <br />
        <br />
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>Name </th>
              <th>Type</th>
              <th>Number</th>
              <th> Edit contact </th>
              <th> Delete contact </th>
            </tr>
          </thead>
          <tbody>{contacts}</tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit contact</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="firstname">Firstname</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={this.state.editingElement.firstname}
                  onChange={this.inputHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={this.state.editingElement.lastname}
                  onChange={this.inputHandler}
                />
              </FormGroup>

              <FormGroup tag="fieldset">
                <legend>Type</legend>
                <Row>
                  <Col md={4}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          checked={
                            this.state.editingElement.type === "Cellphone"
                          }
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
                          checked={this.state.editingElement.type === "Work"}
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
                          checked={this.state.editingElement.type === "Home"}
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
                  type="text"
                  name="number"
                  id="number"
                  value={this.state.editingElement.number}
                  onChange={this.inputHandler}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ContactList;
