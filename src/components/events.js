import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { useChat } from '../context/chatState';

const Events = () => {

    const { events, setSelectedEventIndex, setSelectedEvent } = useChat()


    return (
        <ListGroup variant="flush">
            {events.map((event, index) => (
                <ListGroup.Item 
                key={index}
                action
                onClick={()=> {
                    setSelectedEventIndex(index)
                    setSelectedEvent(event)
                }}
                active={event.selected}
                
                >
                {event.recipients.map(r => r.name).join(',')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default Events;