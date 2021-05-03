import React, { useRef } from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../context/contactState';
import { Form, Button } from 'react-bootstrap'

const Contacts = () => {

    const idRef = useRef()
    const nameRef = useRef()
    const { contacts, createContact } = useContacts()

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

        <ListGroup variant="flush">
            {contacts && contacts.map(contact => (
                <ListGroup.Item key={contact.id}>
                {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>

        </div>
    );
};

export default Contacts;

