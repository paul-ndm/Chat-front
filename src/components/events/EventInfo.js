import React, {useState} from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap'
import { useChat } from '../../context/chatState';
import { useAuth } from '../../context/authState'
import { leaveEvent } from '../../utils/api'
import { BoxArrowLeft, Plus, CalendarEvent, GeoAlt } from 'react-bootstrap-icons'
import AddMemberModal from './addMemberModal'

const EventInfo = () => {

    const { events, selectedEventIndex, setSelectedEventIndex, removeLocalEvent } = useChat()
    const { currentUser } = useAuth()
    const [showModal, setShowModal] = useState(false)

    const leave = (event) => {
        removeLocalEvent(event)
        const { uid, displayName } = currentUser
        leaveEvent(uid, displayName, event.eventId)
    }

    function closeModal() {
        setShowModal(false)
      }


    return (
        <div>

        <div className="d-flex flex-row">
        <Button className="sidebar sideButton " onClick={()=> leave(events[selectedEventIndex])}>
        <BoxArrowLeft size={50} />
        </Button>
        <br/>

        <Button className="sidebar sideButton" onClick={() => setShowModal(true)}>
        <Plus size={50} />
        </Button>
    
          <Modal show={showModal} onHide={closeModal}>
            <AddMemberModal closeModal={closeModal}/>
          </Modal>


        </div>


        <br/>

        <h2>{events[selectedEventIndex].name}</h2>

        <h3>{events[selectedEventIndex].place}</h3>

        <h3>{events[selectedEventIndex].date}</h3>



        <ListGroup variant="flush">
        {events[selectedEventIndex] && events[selectedEventIndex].recipients.map((recipient, index) => (
            <ListGroup horizontal={'sm'} key={events[selectedEventIndex].eventId + index}>
            <ListGroup.Item
            style={{borderRadius: '10px'}}
            key={'member', index, events[selectedEventIndex].eventId}
            >
            {recipient.name}
            </ListGroup.Item>
            </ListGroup>
            ))}
        </ListGroup>

        </div>

    );
};

export default EventInfo;

// <Button key={index + event.eventId} className="custom-btn" onClick={()=> leave(event)} className="rounded-0">X</Button>