import React, { useState} from 'react';
import { useAuth } from '../../context/authState'
import { Modal, Button, Card, ListGroup } from 'react-bootstrap'
import { useContacts } from '../../context/contactState'
import {deleteContactInDb} from '../../utils/api'
import { XCircleFill } from 'react-bootstrap-icons'

const AccountModal = () => {

    const { currentUser } = useAuth()
    const { contacts, removeLocalContact } = useContacts()

    const removeContact = (contact) => {
        removeLocalContact(contact)
        deleteContactInDb(currentUser, contact)
      }

    return (
        
        <Modal.Body key={'event-modal-body'} className="m-0" style={{backgroundColor: '#fafafa'}}>
        <Card className="mr-3" style={{backgroundColor: '#fafafa'}} className="d-flex flex-col justify-content-center">
        <Card.Header className="d-flex flex-row">
            User Information
        </Card.Header>
        <Card.Body style={{backgroundColor: '#fafafa'}}>
        <Card.Title>
        {currentUser && currentUser.displayName}
        </Card.Title>

        <Card.Subtitle className="text-muted">
        {currentUser && currentUser.uid}
        
        </Card.Subtitle>
            <br/>

            <Card.Subtitle>
            Contacts:
            
            </Card.Subtitle>

        <ListGroup variant="flush">
        {contacts && contacts.map((contact, index) => (
            <ListGroup variant="flush" className="d-flex flex-row justify-content-between" style={{width: '200px'}}>
            <ListGroup.Item
           
            style={{height: '45px', backgroundColor: '#fafafad'}}
            key={contact.name + index + contact.userId}
            >
            {contact.name}
            </ListGroup.Item>

            <button style={{ height: '45px'}} key={index + contact.userId} className="sidebar deleteButton" onClick={()=> removeContact(contact)}>
            <XCircleFill size={'40px'} />
            </button>
            </ListGroup>
            ))}
        </ListGroup>



        </Card.Body>
        </Card>
        </Modal.Body>
        

    );
};

export default AccountModal;