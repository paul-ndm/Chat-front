import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useAuth } from './authState'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
  }

export const SocketState = ({children}) => {
     const [socket, setSocket] = useState()
     const { currentUser } = useAuth()

     useEffect(async ()=> {

        if (currentUser) {
            const id = currentUser.uid
            const newSocket = io(
                'http://localhost:5000',
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


