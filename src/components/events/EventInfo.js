import React, {useState} from 'react';
import { Card, ListGroup, Modal } from 'react-bootstrap'
import { useChat } from '../../context/chatState';
import { useAuth } from '../../context/authState'
import { leaveEvent } from '../../utils/api'
import { BoxArrowLeft, Plus} from 'react-bootstrap-icons'
import AddMemberModal from './addMemberModal'
import "react-datepicker/dist/react-datepicker.css";

const EventInfo = () => {

    const { events, selectedEventIndex, removeLocalEvent, leavingEvent } = useChat()
    const { currentUser } = useAuth()
    const [showModal, setShowModal] = useState(false)

    const leave = (event) => {
        removeLocalEvent(event)
        const { uid, displayName } = currentUser
        leaveEvent(uid, displayName, event.eventId)
        leavingEvent(event, uid)
    }

    function closeModal() {
        setShowModal(false)
      }


    return (
        <div>
        <Card className="mr-3" style={{backgroundColor: '#fafafa'}}>
        <Card.Header className="d-flex flex-row">

   
        <button className="sidebar sideButton " onClick={()=> leave(events[selectedEventIndex])}>
        <BoxArrowLeft size={50} />
        </button>
        <br/>

        <button className="sidebar sideButton" onClick={() => setShowModal(true)}>
        <Plus size={50} />
        </button>
    
          <Modal show={showModal} onHide={closeModal}>
            <AddMemberModal closeModal={closeModal}/>
          </Modal>

        </Card.Header>
        <Card.Body style={{backgroundColor: '#fafafa'}}>
        <Card.Title>
        {events[selectedEventIndex] && events[selectedEventIndex].name}
        </Card.Title>
        <Card.Subtitle className="text-muted">{events[selectedEventIndex] && events[selectedEventIndex].place}
        </Card.Subtitle>
        <br/>

        <Card.Subtitle>
        {events[selectedEventIndex] && events[selectedEventIndex].date.slice(0, 16) + ' | ' + events[selectedEventIndex].date.slice(16, 21)}
        </Card.Subtitle>

        <ListGroup variant="flush">
        {events[selectedEventIndex] && events[selectedEventIndex].recipients.map((recipient, index) => (
    
            <ListGroup.Item
            style={{ backgroundColor: '#fafafa'}}
            key={recipient.name + index + events[selectedEventIndex].eventId}
            >
            {recipient.name}
            </ListGroup.Item>

            ))}
        </ListGroup>



        </Card.Body>
        </Card>

        </div>

    );
};

export default EventInfo;

// <Button key={index + event.eventId} className="custom-btn" onClick={()=> leave(event)} className="rounded-0">X</Button>


// <div className="d-flex flex-row">
//         <Button className="sidebar sideButton " onClick={()=> leave(events[selectedEventIndex])}>
//         <BoxArrowLeft size={50} />
//         </Button>
//         <br/>

//         <Button className="sidebar sideButton" onClick={() => setShowModal(true)}>
//         <Plus size={50} />
//         </Button>
    
//           <Modal show={showModal} onHide={closeModal}>
//             <AddMemberModal closeModal={closeModal}/>
//           </Modal>


//         </div>


//         <br/>

//         <h2>{events[selectedEventIndex].name}</h2>

//         <h3>{events[selectedEventIndex].place}</h3>

//         <DatePicker
//         selected={events[selectedEventIndex].date}
//         showTimeSelect
//         dateFormat="MMMM d, yyyy h:mm aa"
//         />





//         <ListGroup variant="flush">
//         {events[selectedEventIndex] && events[selectedEventIndex].recipients.map((recipient, index) => (
//             <ListGroup horizontal={'sm'} key={events[selectedEventIndex].eventId + index}>
//             <ListGroup.Item
//             style={{borderRadius: '10px'}}
//             key={'member', index, events[selectedEventIndex].eventId}
//             >
//             {recipient.name}
//             </ListGroup.Item>
//             </ListGroup>
//             ))}
//         </ListGroup>