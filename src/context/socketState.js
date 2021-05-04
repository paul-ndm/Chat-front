import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
  }

export const SocketState = ({children}) => {
     const [socket, setSocket] = useState()

     useEffect(async ()=> {

        const JSONdata = await localStorage.getItem('chat-account')
        const localAccount = await JSON.parse(JSONdata)

        if (localAccount) {
            const id = localAccount.id
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


