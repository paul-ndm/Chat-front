import React, { useState} from 'react';
import { Modal} from 'react-bootstrap'
import EventModal from './eventModal'
import EventList from './EventList'
import { Plus } from 'react-bootstrap-icons'

const EventPage = () => {
    const [showModal, setShowModal] = useState(false)

    function closeModal() {
        setShowModal(false)
      }

    return (

      <div className="mt-3 mb-3">
      <button className="sidebar sideButton d-flex flex-col justify-content-center w-100" style={{ height: '48px'}} onClick={() => setShowModal(true)}>
      <Plus  size={45} />
      </button>
  
        <Modal show={showModal} onHide={closeModal}>
          <EventModal closeModal={closeModal}/>
        </Modal>
      <EventList/>
      
      </div>
    )

};

export default EventPage;

