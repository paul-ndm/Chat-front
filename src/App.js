import React from 'react'
import OpenPrivatChat from './components/contacts/openPrivatChat'
import OpenEvent from './components/events/openEvent'
import { useAuth } from './context/authState'
import { Switch, Route, Redirect } from "react-router-dom";
import { Container} from 'react-bootstrap'
import Signup from './components/Account/Signup'
import GoogleLogIn from './components/Account/googleLogin'
import './App.css';
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import RightSide from './components/rightSide'


function App() {

 const { currentUser } = useAuth()

 const chat = (
  
  <React.Fragment>
  <Switch>
  <div className="d-flex flex-row" style={{minHeight: '600px'}}>

  <Sidebar/>

  <Route exact path="/">
    <Redirect to="/events" />
  </Route>


  <Route path="/events">
    <OpenEvent />
  </Route>

  <Route path='/contacts'>
    <OpenPrivatChat />
  </Route>

  <RightSide/>

  </div>
  </Switch>
  </React.Fragment>
  


 )

  return (
    <div className="page">
    { currentUser   ? chat : <GoogleLogIn/> }
    </div>
  );
}

export default App;


