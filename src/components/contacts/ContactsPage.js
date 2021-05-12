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

