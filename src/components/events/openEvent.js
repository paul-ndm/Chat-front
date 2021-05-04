import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useChat } from '../../context/chatState';

export default function OpenEvent () {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const { account, sendMessage, events, selectedEventIndex, setEvents} = useChat()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      events[selectedEventIndex].eventId,
      events[selectedEventIndex].recipients.map(r => r.id),
      text
    )
    events[selectedEventIndex].messages.push({text, id: account.id, author: account.name })
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {events[selectedEventIndex].messages.map((message, index) => {
            const fromMe = account.id === message.id
            const lastMessage = events[selectedEventIndex].messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${fromMe ? 'text-right' : ''}`}>
                  {fromMe ? 'You' : message.author}
                </div>
              </div>
            )
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