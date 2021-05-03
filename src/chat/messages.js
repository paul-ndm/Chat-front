import React from 'react'
import { useChat } from '../context/chatState'

const Messages = () => {  
    
    const { messages } = useChat()
    
    return (
       <div>
        <ul>
        {messages && messages.map( (message, index) => 
            <li key={index}>{message}</li>
        )}
        
        </ul>
       
       </div>
    )
}

export default Messages