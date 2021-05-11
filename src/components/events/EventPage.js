import React, { useState} from 'react';
import {Button, Modal, Container, Row, Col } from 'react-bootstrap'
import EventModal from './eventModal'
import EventList from './EventList'
import OpenEvents from './openEvent'
import { useChat } from '../../context/chatState'
import { Plus } from 'react-bootstrap-icons'

const EventPage = () => {
    const [showModal, setShowModal] = useState(false)
    const { events, selectedEventIndex } = useChat()

    function closeModal() {
        setShowModal(false)
      }

    return (

      <div className="mt-2">
      <Button className="sidebar sideButton d-flex justify-content-center w-100" style={{ height: '45px'}} onClick={() => setShowModal(true)}>
      <Plus style={{position: 'relative', minWidth: '10px'}} size={'35px'} />
      </Button>
  
        <Modal show={showModal} onHide={closeModal}>
          <EventModal closeModal={closeModal}/>
        </Modal>
      <EventList/>
      
      </div>
    )

};

export default EventPage;

// <div className="d-flex" style={{ height: '100vh' }}>
// <div>

// <Button onClick={() => setShowModal(true)} className="rounded-0">
// New Event
// </Button>
// <br />
// <Modal show={showModal} onHide={closeModal}>
//   <EventModal closeModal={closeModal}/>
// </Modal>
// <EventList/>

// </div>
// {events[selectedEventIndex] && <OpenEvents />}
// </div>