import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import { useChat } from '../../context/chatState';
import { useAuth } from '../../context/authState'
import { leaveEvent } from '../../utils/api'

const EventList = () => {

    const { events, selectedEventIndex, setSelectedEventIndex, removeLocalEvent } = useChat()
    const { currentUser } = useAuth()

    const leave = (event) => {
        removeLocalEvent(event)
        const { uid, displayName } = currentUser
        leaveEvent(uid, displayName, event.eventId)

    }

    return (
        <ListGroup variant="flush">
            {events && events.map((event, index) => (
                <ListGroup horizontal={'sm'} key={event.eventId + index}>
                <ListGroup.Item
                className="sidebar"
                key={index}
                action
                onClick={()=> {
                    setSelectedEventIndex(index)
                }}
                active={index === selectedEventIndex}
                
                >
                {event.name}
                </ListGroup.Item>
                </ListGroup>
            ))}
        </ListGroup>
    );
};

export default EventList;

// <Button key={index + event.eventId} className="custom-btn" onClick={()=> leave(event)} className="rounded-0">X</Button>