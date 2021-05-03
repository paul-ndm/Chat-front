import React, { useState, useEffect, useContext } from 'react';
import {useSocket} from './socketState'


const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
  }

export const ChatState = ({children}) => {
    const [messages, setMessages] = useState([])
    const [account, setAccount] = useState()
    const [events, setEvents ] = useState([])
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const [selectedEvent, setSelectedEvent ] = useState()
    const { socket } = useSocket()

    useEffect(()=> {
      const JSONdata = localStorage.getItem('chat-account')
      const localAccount = JSON.parse(JSONdata)
      if (localAccount) {
        setAccount(localAccount)
      }
      
   },[])

   // switch selected-property
   useEffect(()=> {
    const newEvents = events.map((event, index) => {
      const { recipients, messages } = event
      const selected = index === selectedEventIndex
      return { recipients, messages, selected}
    })
    setEvents(newEvents)
   }, [selectedEventIndex])


     const getMessage = (message) => {
        setMessages( prev => [...prev, message])
     }

    // sending & receving messages
    useEffect(()=> {
      if (socket == null) return 
  
      socket.on('receive-message', (messages) => {
        console.log(messages)
      })
  
      return () => socket.off('receive-message')

    },[socket])

     const sendMessage = (recipients, text) => {
      socket.emit('send-message', { recipients, text})
      }

     const createEvent = (recipients) => {

        setEvents(prev => {
          const newEvent = { recipients, messages: [], selected: true}

          const oldEvents = prev.map( event => 
            {
            const { recipients, messages, selected} = event
            return { recipients, messages, selected: false}
          } 
          )

          setSelectedEventIndex(oldEvents.length)
          setSelectedEvent(newEvent)


          return [...oldEvents, newEvent ]
        })
     }

    return (
        <ChatContext.Provider value={{account, setAccount, messages, getMessage, sendMessage, createEvent, events, setSelectedEventIndex, setSelectedEvent, selectedEvent}}>
            {children}
        </ChatContext.Provider>
    );
};


