import React, { Component } from "react";
import {
  Table,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { orderBy } from "lodash";
import axios from "axios";
import EditContactModal from "./EditContactModal";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      contacts: [],
      modalOpen: false,
      selectedContactId: null
    };
  }

  getContacts = () => {
    axios
      .get("http://localhost:3000/contacts")
      .then(response => {
        this.setState({
          ...this.state,
          contacts: response.data
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    // axios
    //   .get("http://localhost:3000/contacts")
    //   .then(response => {
    //     this.setState({
    //       ...this.state,
    //       contacts: response.data
    //     });
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
    this.getContacts();
  }

  delete = id => {
    axios
      .delete("http://localhost:3000/contacts/" + id)
      .then(response => {
        this.setState({
          ...this.state,
          contacts: this.state.contacts.filter(contact => contact.id !== id)
        });
      })
      .catch(function(error) {
        alert(error);
      });
  };

  toggle = (id, changedContact) => {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen,
      selectedContactId: id
    });
    if (changedContact) {
      this.getContacts();
    }
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
                <Button
                  outline
                  color="primary"
                  onClick={() => this.toggle(el.id)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  outline
                  color="danger"
                  onClick={() => this.delete(el.id)}
                >
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
            <DropdownItem onClick={this.sortByFirstname}>
              By firstname
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.sortByLastname}>
              By lastname
            </DropdownItem>
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
        <EditContactModal
          isOpen={this.state.modalOpen}
          id={this.state.selectedContactId}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default ContactList;
