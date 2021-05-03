import { useEffect, useState } from 'react'
import {socket} from './socket/socket'
//import Chat from './chat/chat'
import Contacts from './components/contacts'
import Login from './components/login'
import Dashboard from './components/dashboard'
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
