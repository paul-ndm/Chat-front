import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState'
import { useChat } from '../../context/chatState'

const AddMemberModal = ({ closeModal }) => {
  const [selectedContacts, setSelectedContactIds] = useState([])

  const { contacts } = useContacts()
  const { addMember, events, selectedEventIndex } = useChat()


  function handleSubmit(e) {
    e.preventDefault()
    addMember(selectedContacts.map(({userId, name}) => { return {id: userId, name}}))
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

  const selectedIds = events[selectedEventIndex].recipients.map( recipient => recipient.id)

  return (
    <div key={'addmember-modal'}>
      <Modal.Header closeButton>Add Members</Modal.Header>
      <Modal.Body key={'event-modal-body'}>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact, index) => {
            if (!selectedIds.includes(contact.userId)) {
              return (
            <Form.Group controlId={contact.id} key={contact.id}>
            <Form.Check
            key={'checkbox', contact.id}
              type="checkbox"
              value={selectedContacts.includes(contact)}
              label={contact.name}
              onChange={() => handleCheckboxChange(contact)}
            />
          </Form.Group>
              )}}
            )}
          <Button type="add" className="sidebar sideButton"  >add</Button>
        </Form>
      </Modal.Body>
    </div>
  )
}

export default AddMemberModal