import io from 'socket.io-client'
import { useEffect } from 'react'
import { useChat } from '../context/chatState'

const URL = "http://localhost:5000";
export const socket = io(URL);

// io.connect()
// io.connect(myID)

socket.on("test", (arg) => {
    console.log(arg); 
  })


 

