import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useContacts } from '../../context/contactState';
import { useChat } from '../../context/chatState';
import { useAuth } from '../../context/authState'
import { updatePrivateChat } from '../../utils/api'
import { ArrowRightSquare } from 'react-bootstrap-icons'


export default function OpenPrivatChat () {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const {contacts, selectedContactIndex } = useContacts()
  const { sendPrivateMessage } = useChat()
  const { currentUser } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    let message = { text, mine: false}
    let localMessage = { text, mine: true}

    sendPrivateMessage(
      contacts[selectedContactIndex].userId,
      message
    )
    contacts[selectedContactIndex].messages.push(localMessage)
    updatePrivateChat(currentUser, contacts)

    setText('')
  }

  return (

 
  <div className="d-flex m-2 p-2 flex-column flex-grow-1 chatWindow " style={{ maxHeight: '600px'}}>
   <div className=" flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {contacts && contacts[selectedContactIndex].messages.map((message, index) => {
            const fromMe = currentUser.uid === message.id
            const lastMessage = contacts[selectedContactIndex].messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.mine ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.mine ? 'myMessage' : 'message'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.mine ? 'text-right' : ''}`}>
                  {fromMe ? 'You' : message.author}
                </div>
              </div>
            )
          })}
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