import React, { useState} from 'react';
import { useAuth } from '../../context/authState'
import { useContacts } from '../../context/contactState';
import { Form, Button, Modal, ListGroup } from 'react-bootstrap'
import {addContact} from '../../utils/api'


const ContactModal = ({closeModal}) => {

    const [input, setInput] = useState()
    const [selectedUser, setSelectedUser] = useState()
    const [filteredUsers, setFilteredUsers ] = useState()
    const { createContact } = useContacts()
    const { allUsers, currentUser } = useAuth()

    function handleSubmit(e) {
      e.preventDefault()
      console.log(selectedUser)
      addContact(currentUser, selectedUser)
      createContact(selectedUser)
      closeModal()
    }

    const filterByInput = (input) => {

      setInput(input)
      const filtered = allUsers.filter(user => {
      const userFound = user.name.toLowerCase().includes(input.toLowerCase())
        if (userFound) {
          return user
        }
      })
      setFilteredUsers(filtered)
    }



    return (
        <div>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body> 
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search for Users</Form.Label>
          <Form.Control type="text" value={input} onChange={e=> filterByInput(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Add Contact</Button>
      </Form>

      <ListGroup variant="flush">
            {filteredUsers && filteredUsers.map((user, index) => (
                <ListGroup.Item 
                key={user.userId}
                action
                onClick={()=> {
                  filterByInput(user.name)
                  setSelectedUser(user)
                }}
                >
                {user.name}
                </ListGroup.Item>
            ))}
        </ListGroup>

      </Modal.Body>

        </div>
    );
};

export default ContactModal;

// return (
//   <div>
//   <Modal.Header closeButton>Create Conversation</Modal.Header>
//   <Modal.Body> 
//   <Form onSubmit={handleSubmit}>
//   <Form.Group>
//     <Form.Label>Id</Form.Label>
//     <Form.Control type="text" ref={idRef} required />
//   </Form.Group>
//   <Form.Group>
//     <Form.Label>Name</Form.Label>
//     <Form.Control type="text" ref={nameRef} required />
//   </Form.Group>
//   <Button type="submit">Add Contact</Button>
// </Form>
// </Modal.Body>

//   </div>
// );

