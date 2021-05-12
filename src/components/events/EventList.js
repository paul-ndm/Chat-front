import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { useChat } from '../../context/chatState';

const EventList = () => {

    const { events, selectedEventIndex, setSelectedEventIndex } = useChat()

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