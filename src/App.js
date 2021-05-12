import React from 'react'
import OpenPrivatChat from './components/contacts/openPrivatChat'
import OpenEvent from './components/events/openEvent'
import { useAuth } from './context/authState'
import { useContacts } from './context/contactState'
import { Switch, Route, Redirect } from "react-router-dom";
import GoogleLogIn from './components/Account/googleLogin'
import './App.css';
import Sidebar from './components/sidebar'
import RightSide from './components/rightSide'


function App() {

 const { currentUser } = useAuth()
 const { contacts } = useContacts()

 const chat = (
  
  <div className="d-flex flex-row" style={{minHeight: '600px'}}>
  <Switch> 

  <Route exact path="/">
    <Redirect to="/events" />
  </Route>

  <Route path="/events">
    <Sidebar/>
    <OpenEvent />
    <RightSide/>
  </Route>

  <Route path='/contacts'>
    <Sidebar/>
    {contacts && <OpenPrivatChat />}
    <RightSide/>
  </Route>

  </Switch>
  </div>
 )

  return (
    <div className="page">
    { currentUser   ? chat : <GoogleLogIn/> }
    </div>
  );
}

export default App;


