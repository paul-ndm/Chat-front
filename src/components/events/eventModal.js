import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState'
import { useChat } from '../../context/chatState'

const EventModal = ({ closeModal }) => {
  const [selectedContacts, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createEvent } = useChat()


  function handleSubmit(e) {
    e.preventDefault()
    createEvent(selectedContacts.map(({userId, name}) => { return {id: userId, name}}))
    closeModal()
  }

  function handleCheckboxChange(contact) {
    setSelectedContactIds(prev => {
      if (prev.includes(contact)) {
        const result = prev.filter(c => c !== contact)
        return result
      } else {
        return [...prev, contact]
      }
    })
  }

  return (
    <div>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContacts.includes(contact)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
}

export default EventModal