import React, { useState} from 'react';
import Logout from './Account/logout'
import { PersonFill } from 'react-bootstrap-icons'
import EventPage from './events/EventPage'
import ContactsPage from './contacts/ContactsPage'
import { NavLink, Route } from 'react-router-dom'
import {Button, Modal, Container, Row, Col } from 'react-bootstrap'
import ContactList from './contacts/ContactList'
import OpenEvent from './events/openEvent'

const Sidebar = () => {


    return (
 

        <div className=" mt-2 ml-3 d-flex flex-column " style={{width: '100px', height: 'auto'}}>
        <PersonFill color="#ebeced" className="sidebar w-100" size={96} onClick={() => console.log('arrow')}/>  
        <Logout />

        
        <Route path="/events">
        <NavLink to="/contacts" style={{textAlign: 'center'}} activeStyle={{color: 'red'}}>
        <Button className="sidebar w-100 sideButton" style={{ maxHeight: "auto"}}>Contacts</Button>
        </NavLink>
        <EventPage/>
        </Route>
        
        
        <Route path="/contacts"> 
        <NavLink to="/events" style={{textAlign: 'center'}} activeStyle={{color: 'red'}}>
        <Button className="sidebar w-100 sideButton" style={{ maxHeight: "auto"}}>Events</Button>
        </NavLink>
        <ContactsPage/>
        </Route>

        
        </div>

    );
};

export default Sidebar;