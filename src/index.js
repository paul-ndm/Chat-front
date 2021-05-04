import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { AuthState } from './context/authState'
import {ChatState} from './context/chatState'
import {SocketState} from './context/socketState'
import { ContactState} from './context/contactState'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthState>
  <SocketState>
  <ContactState>
  <ChatState>
    <App/>
  </ChatState>
  </ContactState>
  </SocketState>
  </AuthState>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
