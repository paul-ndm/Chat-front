import React, {useState } from 'react';
import ContactList from './ContactList'
import { useContacts } from '../../context/contactState';
import { Button, Modal, Row, Col } from 'react-bootstrap'
import OpenPrivatChat from './openPrivatChat'
import ContactModal from './contactModal'
import { useAuth } from '../../context/authState'
import { Plus } from 'react-bootstrap-icons'

const ContactsPage = () => {

    const { contacts, selectedContactIndex } = useContacts()
    const [showModal, setShowModal] = useState(false)
    const { currentUser } = useAuth()

    function closeModal() {
        setShowModal(false)
      }



    return (

      <div className="mt-2">
      
      <button className=" pb-1 sidebar sideButton d-flex justify-content-center w-100" style={{ height: '45px'}} onClick={() => setShowModal(true)}>
      <Plus size={'45px'} />
      </button>
  
        <Modal show={showModal} onHide={closeModal}>
          <ContactModal closeModal={closeModal}/>
        </Modal>
      <ContactList/>
      
      </div>
    );
};

export default ContactsPage;

