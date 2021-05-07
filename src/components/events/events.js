import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import { useChat } from '../../context/chatState';

const Events = () => {

    const { events, selectedEventIndex, setSelectedEventIndex, removeLocalEvent } = useChat()

    const leaveEvent = (event) => {
        removeLocalEvent(event)

    }

    return (
        <ListGroup variant="flush">
            {events.map((event, index) => (
                <ListGroup horizontal={'sm'} key={event.eventId + index}>
                <ListGroup.Item 
                key={index}
                action
                onClick={()=> {
                    setSelectedEventIndex(index)
                }}
                active={index === selectedEventIndex}
                
                >
                {event.recipients.map(r => r.name).join(',')}
                </ListGroup.Item>
                <Button key={index + event.eventId} variant="danger" onClick={()=> leaveEvent(event)} className="rounded-0">X</Button>
                </ListGroup>
            ))}
        </ListGroup>
    );
};

export default Events;