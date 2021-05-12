import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useAuth } from './authState'
import { URL } from '../socket/socket'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
  }

export const SocketState = ({children}) => {
     const [socket, setSocket] = useState()
     const { currentUser } = useAuth()

     useEffect(async ()=> {

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

     }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};


