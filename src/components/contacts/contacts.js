import React, { useRef, useState } from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { Button, Modal } from 'react-bootstrap'
import OpenPrivatChat from './openPrivatChat'
import ContactModal from './contactModal'

const Contacts = () => {

    const { contacts, setSelectedContactIndex, selectedContactIndex } = useContacts()
    const [showModal, setShowModal] = useState(false)

    function closeModal() {
        setShowModal(false)
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
        <ListGroup variant="flush">
            {contacts && contacts.map((contact, index) => (
                <ListGroup.Item 
                key={contact.id}
                action
                onClick={()=> {
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

