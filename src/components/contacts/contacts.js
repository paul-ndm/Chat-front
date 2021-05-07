import React, {useState } from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { Button, Modal } from 'react-bootstrap'
import OpenPrivatChat from './openPrivatChat'
import ContactModal from './contactModal'
import {deleteContactInDb} from '../../utils/api'
import { useAuth } from '../../context/authState'

const Contacts = () => {

    const { contacts, setSelectedContactIndex, selectedContactIndex, removeLocalContact } = useContacts()
    const [showModal, setShowModal] = useState(false)
    const { currentUser } = useAuth()

    function closeModal() {
        setShowModal(false)
      }

    const removeContact = (contact) => {
      removeLocalContact(contact)
      deleteContactInDb(currentUser, contact)

    }

    return (
        <div>

        <Button onClick={() => setShowModal(true)} className="rounded-0">
          New Contact
        </Button>
       <br />
        <Modal show={showModal} onHide={closeModal}>
            <ContactModal closeModal={closeModal}/>
        </Modal>
        <br />

      <div className="d-flex" style={{ height: '50vh' }}>
      <div>
        <ListGroup variant="flush" className="d-flex">
            {contacts && contacts.map((contact, index) => (
                <ListGroup horizontal={'sm'} key={contact.userId + index}>
                <ListGroup.Item 
                key={contact.userId}
                action
                onClick={()=> {
                  setSelectedContactIndex(index)
                }}
                active={contact.selected}
                >
                {contact.name}
                </ListGroup.Item>
                <Button key={index + contact.userId} variant="danger" onClick={()=> removeContact(contact)} className="rounded-0">X</Button>
                </ListGroup>


            ))}
        </ListGroup>
        </div>
        {contacts[selectedContactIndex] && <OpenPrivatChat/>}
        </div>

        </div>
    );
};

export default Contacts;

