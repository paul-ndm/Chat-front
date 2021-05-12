import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useChat } from '../../context/chatState';
import { useAuth } from '../../context/authState'
import { ArrowRightSquare } from 'react-bootstrap-icons'

export default function OpenEvent () {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const { sendMessage, events, selectedEventIndex, setEvents} = useChat()
  const { currentUser } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      events[selectedEventIndex].eventId,
      events[selectedEventIndex].recipients.map(r => r.id),
      text
    )
    
    setEvents(prev => prev.map(event => event.eventId === events[selectedEventIndex].eventId ? ({...event, messages: [...event.messages, {text, id: currentUser.uid, author: currentUser.displayName }]}): event))
    setText('')
  }

  return (

    

    <div className="d-flex m-2 p-2 flex-column flex-grow-1 chatWindow " style={{ maxHeight: '600px'}}>
      <div className=" flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
           {
            events && events[selectedEventIndex] !== undefined  ? events[selectedEventIndex].messages.map((message, index) => {
              const fromMe = currentUser.uid === message.id
              const lastMessage = events[selectedEventIndex].messages.length - 1 === index
              return (
                <div
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex flex-column ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                >
                  <div
                    className={`rounded px-2 py-1 ${fromMe ? 'myMessage' : 'message'}`}>
                    {message.text}
                  </div>
                  <div className={`text-muted small ${fromMe ? 'text-right' : ''}`}>
                    {fromMe ? 'You' : message.name}
                  </div>
                </div>
              )
            }): 'No events'
        }
        </div>
      </div>

      <Form onSubmit={handleSubmit} style={{ height: '75px'}} className="m-2 chatInput">
        <Form.Group >
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none',borderRadius: '10px' }}
            />
            
              <Button className=" m-1 sidebar sideButton" style={{ height: '70px', width: '70px'}} type="submit">
              <ArrowRightSquare size={45}/>
              </Button>
           
          </InputGroup>
        </Form.Group>
      </Form>
      
    </div>
  

    )
}