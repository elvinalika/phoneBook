import phoneBook from "./phoneBook";
import { pullAt, findIndex } from "lodash";

export let contacts = phoneBook;
let count = 12;

export const getContacts = () => {
  return contacts;
};

export const createNewContact = contact => {
  let poz = findIndex(contacts, ["number", contact.number]);
  if (poz !== -1) {
    return "The contact is already on the list!";
  } else {
    count++;
    contacts = [
      ...contacts,
      {
        id: count,
        ...contact
      }
    ];
    return "The new contact has been added to the phone book!";
  }
};

export const editContact = contact => {
  let index = findIndex(contacts, ["number", contact.number]);
  contacts[index].firstname = contact.firstname;
  contacts[index].lastname = contact.lastname;
  contacts[index].type = contact.type;
  contacts[index].number = contact.number;
  return contacts;
};

export const deleteContact = contactId => {
  let index = findIndex(contacts, ["id", contactId]);
  if (index !== -1) {
    pullAt(contacts, [index]);
  }
  return contacts;
};

export const getOneContact = id => {
  let index = findIndex(contacts, ["id", id]);
  return contacts[index];
};
