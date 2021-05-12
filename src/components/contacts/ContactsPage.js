import React, {useState } from 'react';
import ContactList from './ContactList'
import {  Modal } from 'react-bootstrap'
import ContactModal from './contactModal'
import { Plus } from 'react-bootstrap-icons'

const ContactsPage = () => {

    const [showModal, setShowModal] = useState(false)

    function closeModal() {
        setShowModal(false)
      }

    return (

      <div className="mt-3 mb-3">
      <button className="sidebar sideButton d-flex flex-col justify-content-center w-100" style={{ height: '48px'}} onClick={() => setShowModal(true)}>
      <Plus size={45} />
      </button>
  
        <Modal show={showModal} onHide={closeModal}>
          <ContactModal closeModal={closeModal}/>
        </Modal>
      <ContactList/>
      
      </div>
    );
};

export default ContactsPage;

