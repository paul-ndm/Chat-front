import React, { useRef } from 'react';

import { useContacts } from '../../context/contactState';
import { Form, Button, Modal } from 'react-bootstrap'


const ContactModal = ({closeModal}) => {

    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()

    function handleSubmit(e) {
      e.preventDefault()
      createContact(idRef.current.value, nameRef.current.value)
      closeModal()
    }

    return (
        <div>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body> 
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
      </Modal.Body>

        </div>
    );
};

export default ContactModal;

