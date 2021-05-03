import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { useChat } from '../../context/chatState';

export default function OpenPrivatChat () {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const { selectedContact } = useContacts()
  const { sendPrivateMessage } = useChat()

  //const selectedContact = contacts[selectedContactIndex]

  function handleSubmit(e) {
    e.preventDefault()

    sendPrivateMessage(
        selectedContact.id,
        text
    )
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedContact && selectedContact.messages.map((message) => {
            return <div>{message}</div>
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}