import React, { useState} from 'react';
import Logout from './Account/logout'
import { ArrowRight, PersonFill } from 'react-bootstrap-icons'
import { NavLink, Route } from 'react-router-dom'
import {Button, Modal, Container, Row, Col } from 'react-bootstrap'

const Navbar = () => {

    const [eventsSelected, setEventsSelected ] = useState(true)

    return (
 

        <div className=" d-flex justify-content-around" style={{width: '96px', height: 'auto'}}>
        <PersonFill color="black" style={{border: '5px solid blue'}} size={96} onClick={() => console.log('arrow')}/>

        <Logout />

        { eventsSelected ?
            
        <NavLink to='/contacts' style={{textAlign: 'center'}} activeStyle={{color: 'red'}}>
        <Button style={{ height: "auto"}} onClick={()=>setEventsSelected(false)}>Contacts</Button>
        </NavLink> : 
    
        <NavLink to='/events' style={{textAlign: 'center'}} activeStyle={{color: 'red'}}>
        <Button style={{ height: "auto"}} onClick={()=>setEventsSelected(true)}>Events</Button>
        </NavLink>
        }


        
        
        

        </div>
    );
};

export default Navbar;