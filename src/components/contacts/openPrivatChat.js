import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { useChat } from '../../context/chatState';

export default function OpenPrivatChat () {
  const [text, setText] = useState('')

  const {contacts, selectedContactIndex } = useContacts()
  const { sendPrivateMessage } = useChat()

  function handleSubmit(e) {
    e.preventDefault()

    let message = { text, mine: false}
    let localMessage = { text, mine: true}

    sendPrivateMessage(
      contacts[selectedContactIndex].id,
      message
    )

    contacts[selectedContactIndex].messages.push(localMessage)

    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {contacts[selectedContactIndex] && contacts[selectedContactIndex].messages.map((message, index) => {
            return <div 
            key={message + index}
            className={`my-1 d-flex flex-column ${message.mine ? 'align-self-end align-items-end' : 'align-items-start'}`}>{message.text}</div>
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