import React, { useState} from 'react'
//import {socket} from '../socket/socket'
import { useSocket } from '../context/socketState'

const MessageBox = () => {

    const [message, setMessage] = useState('')
    const { socket } = useSocket()

    const sendMessages = (message) => {
        
        socket.emit('chatMessage', message)
    }

    return (
        <input 
        type='text' 
        value={message} 
        placeholder="send message" 
        onChange={e => setMessage(e.target.value)}
        onKeyDown={ e => {
            if (e.key === 'Enter') {
                e.preventDefault()
                sendMessages(message)
                setMessage('')
            }
        }}
        />
    )
}

export default MessageBox