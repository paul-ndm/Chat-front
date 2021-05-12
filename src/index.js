import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { AuthState } from './context/authState'
import {ChatState} from './context/chatState'
import {SocketState} from './context/socketState'
import { ContactState} from './context/contactState'
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
  <ContactState>
  <AuthState>
  <SocketState>
  <ChatState>
    <App/>
  </ChatState>
  </SocketState>
  </AuthState>
  </ContactState>
  </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
