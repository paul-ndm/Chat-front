import React, { useState} from 'react';
import {Button, Modal } from 'react-bootstrap'
import EventModal from './eventModal'
import Events from './events'

const Sidebar = () => {
    const [showModal, setShowModal] = useState(false)

    function closeModal() {
        setShowModal(false)
      }

    return (
        <div>
        <Button onClick={() => setShowModal(true)} className="rounded-0">
          New Event
        </Button>
        <br />
        <Modal show={showModal} onHide={closeModal}>
            <EventModal closeModal={closeModal}/>
        </Modal>
        <Events/>
        </div>
    );
};

export default Sidebar;