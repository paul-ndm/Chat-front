import React from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../../context/contactState';

const ContactList = () => {

    const { contacts, setSelectedContactIndex, selectedContactIndex } = useContacts()

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

