import React, { useRef } from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { Form, Button } from 'react-bootstrap'
import OpenPrivatChat from './openPrivatChat'

const Contacts = () => {

    const idRef = useRef()
    const nameRef = useRef()
    const { contacts, createContact, setSelectedContactIndex, selectedContactIndex } = useContacts()

    function handleSubmit(e) {
      e.preventDefault()
  
      createContact(idRef.current.value, nameRef.current.value)
      
    }

    return (
        <div>

        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={nameRef} required />
        </Form.Group>
        <Button type="submit">Add Contact</Button>
      </Form>
      <div className="d-flex" style={{ height: '50vh' }}>
      
      
      <div>
        <ListGroup variant="flush">
            {contacts && contacts.map((contact, index) => (
                <ListGroup.Item 
                key={contact.id}
                action
                onClick={()=> {
                  //setSelectedContact(contact)
                  setSelectedContactIndex(index)
                }}
                active={contact.selected}
                >
                {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
        </div>

        {contacts[selectedContactIndex] && <OpenPrivatChat/>}
        </div>

        </div>
    );
};

export default Contacts;

