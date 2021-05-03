import { useEffect, useState } from 'react'
import {socket} from './socket/socket'
import Contacts from './components/contacts/contacts'
import Login from './components/login'
import Dashboard from './components/events/dashboard'
import { useChat } from './context/chatState'
import { Switch, Route, Redirect } from "react-router-dom";

function App() {

  useEffect(()=> {
    
    socket.emit('test2', 'from frontend')
  })

 const { account } = useChat()

  return (
    <div>
    <Switch>
    
    <Route path='/chat'>
      <Contacts />
      <br />
      <Dashboard />
    </Route>
    <Route path='/'>
    {account ? <Redirect to="/chat"/> : <Login /> }
    </Route>

    </Switch>
    </div>
  );
}

export default App;
