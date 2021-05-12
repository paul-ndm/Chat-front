import React, {useState } from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { Button, Modal } from 'react-bootstrap'
import {deleteContactInDb} from '../../utils/api'
import { useAuth } from '../../context/authState'

const ContactList = () => {

    const { contacts, setSelectedContactIndex, selectedContactIndex, removeLocalContact } = useContacts()
    const { currentUser } = useAuth()

    const removeContact = (contact) => {
      removeLocalContact(contact)
      deleteContactInDb(currentUser, contact)

    }

    return (
      <ListGroup variant="flush" className="d-flex">
      {contacts && contacts.map((contact, index) => (
          <ListGroup horizontal={'sm'} key={contact.userId + index}>
          <ListGroup.Item 
          key={contact.userId}
          className="sidebar"
          action
          onClick={()=> {
            setSelectedContactIndex(index)
          }}
          active={index === selectedContactIndex}
          >
          {contact.name}
          </ListGroup.Item>
          
          </ListGroup>
      ))}
  </ListGroup>
    );
};

export default ContactList;

