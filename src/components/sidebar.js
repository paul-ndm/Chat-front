import React, { useState} from 'react';
import Logout from './Account/logout'
import { PersonFill } from 'react-bootstrap-icons'
import EventPage from './events/EventPage'
import ContactsPage from './contacts/ContactsPage'
import { NavLink, Route } from 'react-router-dom'
import {Button, Modal, Container, Row, Col } from 'react-bootstrap'
import AccountModal from './Account/account'

const Sidebar = () => {

    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
      }



    return (
 
        <div className=" mt-2 ml-3 d-flex flex-column " style={{width: '100px', height: 'auto'}}>

        <button className="sidebar sideButton d-flex justify-content-center w-100" style={{ height: '75px'}} onClick={() => setShowModal(true)}>
        <PersonFill color="#ebeced" size={'75px'} />
        </button>
        
        <Modal show={showModal} onHide={closeModal}>
        <AccountModal closeModal={closeModal}/>
        </Modal>

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