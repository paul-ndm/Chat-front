import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState'
import { useChat } from '../../context/chatState'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const EventModal = ({ closeModal }) => {
  const [selectedContacts, setSelectedContactIds] = useState([])
  const [details, setDetails] = useState({
    name: "",
    place: "",
    date: new Date().toString()
  })

  const {name, place } = details
  const { contacts } = useContacts()
  const { createEvent } = useChat()

  const handleSubmit= (e) => {
    e.preventDefault()
    //setDetails({...details, date: startDate.toString()})
    console.log(details)
    createEvent(selectedContacts.map(({userId, name}) => { return {id: userId, name}}), details)
    closeModal()
  }

  const onChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });

  };

  const handleCheckboxChange = (contact) => {
    setSelectedContactIds(prev => {
      if (prev.includes(contact)) {
        const result = prev.filter(c => c !== contact)
        return result
      } else {
        return [...prev, contact]
      }
    })
  }


  const [startDate, setStartDate] = useState(new Date())
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  }


  return (
    <div key={'event-modal'}>
      <Modal.Header key={'event-modal-header'} closeButton>New Event</Modal.Header>
      <Modal.Body key={'event-modal-body'}>
        <Form onSubmit={handleSubmit} key= { 'Model-Form'}>
        <Form.Control key= { 'Model-Form-Control'} type="text" name="name" placeholder="name" value={name} onChange={onChange} required />
        <br/>
        <Form.Control key= { 'Model-Form-Control2'} type="text" name="place" placeholder="place" value={place} onChange={onChange} required />
        <br/>
        <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date)
          setDetails({...details, date: date.toString()})}
        }
        showTimeSelect
        filterTime={filterPassedTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        />
        <br/>
          {contacts.map((contact, index) => (
            <Form.Group key= { index } controlId={contact.id}>
              <Form.Check
                type="checkbox"
                checked={selectedContacts.includes(contact)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact)}
              />
            </Form.Group>
          ))}
          <Button key= { 'Event-Submit-Button'} type="submit" className="sidebar sideButton"  >Create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
}

export default EventModal