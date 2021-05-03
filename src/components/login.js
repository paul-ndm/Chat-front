import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useChat } from '../context/chatState'

const Login =() => {

    const idRef = useRef()

    const {setAccount} = useChat()

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = uuidV4()
        const account = {name: idRef.current.value, id}
        localStorage.setItem('chat-account', JSON.stringify(account))
        setAccount(account)
    }


    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
        <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>Enter Chat</Form.Label>
            <Form.Control type ="text" ref={idRef} required />
            </Form.Group>
            <Button type="submit" className='mr-2'>Login</Button>
        </Form>
      </Container>
    );
  }
  
  export default Login;
  