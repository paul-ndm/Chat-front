import React, { useState, useEffect, useContext } from 'react';
import {useSocket} from './socketState'
import {useContacts} from './contactState'

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
  }

export const ChatState = ({children}) => {
    const [account, setAccount] = useState()
    const [events, setEvents ] = useState([])
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const [selectedEvent, setSelectedEvent ] = useState()
    const { socket } = useSocket()
    const { contacts, setContacts } = useContacts()

    useEffect(()=> {
      const JSONdata = localStorage.getItem('chat-account')
      const localAccount = JSON.parse(JSONdata)
      if (localAccount) {
        setAccount(localAccount)
        console.log(localAccount)
      }
      
   },[])

   // switch selected-property
   useEffect(()=> {
    const newEvents = events.map((event, index) => {
      const { recipients, messages } = event
      const selected = index === selectedEventIndex
      const newEvent = { recipients, messages, selected}
      if(newEvent.selected) {
        setSelectedEvent(newEvent)
      }
      return newEvent
    })
    setEvents(newEvents)
   }, [selectedEventIndex])

    // settung up the socket for receving messages
    useEffect(()=> {
      if (socket == null) return 

      socket.on('receive-message', (messages) => {
        console.log(messages)
      })

      socket.on("receive-private-message", ({recipientId, text, sender}) => {
        setContacts(prev => {
          return prev.map(contact => {
             if(contact.id === sender) {
              console.log('message received from', sender, text.text)
               contact.messages.push(text)
               return contact
             } else {
               return contact
             }})})})
  
      return () => {socket.off('receive-message')
                    socket.off("receive-private-message")}
    },[socket])

    // sending messages
     const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text})
        }

      const sendPrivateMessage = (recipientId, text) => {
        socket.emit('private-message', { recipientId, text})
        }

      // create new Event
     const createEvent = (recipients) => {

        setEvents(prev => {
          const newEvent = { recipients, messages: [], selected: true}
          const oldEvents = prev.map( event => {
            const { recipients, messages } = event
            return { recipients, messages, selected: false}
          })

          setSelectedEventIndex(oldEvents.length)
          setSelectedEvent(newEvent)

          return [...oldEvents, newEvent ]
        })}

    return (
        <ChatContext.Provider value={{account, setAccount, sendMessage, sendPrivateMessage, createEvent, events, setSelectedEventIndex, setSelectedEvent, selectedEvent}}>
            {children}
        </ChatContext.Provider>
    );
};


