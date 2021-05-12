import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../context/authState'

const Logout =() => {

    const { logout } = useAuth()

    return (

        <Button className="sidebar sideButton"
        style={{ height: "auto"}}
        onClick={logout} type="submit">
        Log out
        </Button>

    );
  }

  export default Logout