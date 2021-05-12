import React, { useState } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../../context/authState'

const GoogleLogIn =() => {

    const { googleSignIn } = useAuth()
    const [error, setError] = useState("")

    return (
          <Container 
          className="d-flex align-items-center justify-content-center"
          style={{minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}> 
          {error && <Alert variant="danger">{error}</Alert>}
          <Button onClick={googleSignIn} className="w-100 sidebar sideButton" type="submit">
          Sign in with google
            </Button>
          </div>
          </Container>
    );
  }

  export default GoogleLogIn