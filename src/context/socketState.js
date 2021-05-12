import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useAuth } from './authState'


const URL = 'https://eventchating.herokuapp.com'
//const URL =  'http://localhost:5000'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
  }

export const SocketState = ({children}) => {
     const [socket, setSocket] = useState()
     const { currentUser } = useAuth()

     useEffect( ()=> {

        console.log('connecting to:', URL)

        if (currentUser) {
            const id = currentUser.uid
            const newSocket = io(
                URL,
                {query: { id }}
            )
            setSocket(newSocket)
            return () => newSocket.close()
        }
     }, [currentUser])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};


