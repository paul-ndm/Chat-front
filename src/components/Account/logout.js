import React, { useRef } from 'react'
import { Container, Button } from 'react-bootstrap'

import { useAuth } from '../../context/authState'

const Logout =() => {

    const { logout } = useAuth()

    return (

        <Container 
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "10vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}> 
        <Button onClick={logout} className="w-100" type="submit">
        Log out
        </Button>
        </div>
        </Container>
    );
  }

  export default Logout