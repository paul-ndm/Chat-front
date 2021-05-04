import React, { useState, useEffect, useContext } from 'react';
import {useSocket} from './socketState'
import {useContacts} from './contactState'
import { v4 as uuidV4 } from 'uuid'

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
  }

export const ChatState = ({children}) => {
    const [account, setAccount] = useState()
    const [events, setEvents ] = useState([])
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const { socket } = useSocket()
    const { setContacts } = useContacts()

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
      return newEvent
    })
    setEvents(newEvents)
   }, [selectedEventIndex])

    // settung up the socket for receving messages
    useEffect(()=> {
      if (socket == null) return 

      socket.on('receive-message', ({eventId, recipients, sender, message}) => {
        setEvents(prev => {
          return prev.map(event => {
             if(event.eventId === eventId) {
              event.messages.push(message)
               return event
             } else {
               return event
             }})})
      })

      socket.on("receive-private-message", ({recipientId, text, sender}) => {
        setContacts(prev => {
          const spreadContacts = prev.map(c => ({...c, messages: [...c.messages]}))

          return spreadContacts.map(contact => {
             if(contact.id === sender) {
              console.log('message received from', sender, text.text)
               contact.messages.push(text)
               return contact
             } else {
               return contact
             }})})
            })
  
      return () => {socket.off('receive-message')
                    socket.off("receive-private-message")}
    },[socket])

    // sending messages
     const sendMessage = (eventId, recipients, text) => {
        socket.emit('send-message', {eventId, recipients, message: {text, id: account.id, author: account.name }})
        }

      const sendPrivateMessage = (recipientId, text) => {
        socket.emit('private-message', { recipientId, text})
        }

      // create new Event
     const createEvent = (selectedContacts) => {
        const eventId = uuidV4()

        setEvents(prev => {
          const recipients = [...selectedContacts, account]
          const newEvent = { eventId, recipients, messages: [], selected: true}
          const oldEvents = prev.map( event => {
            const { eventId, recipients, messages } = event
            return { eventId, recipients, messages, selected: false}
          })

          setSelectedEventIndex(oldEvents.length)

          return [...oldEvents, newEvent ]
        })}

    return (
        <ChatContext.Provider value={{account, setAccount, sendMessage, sendPrivateMessage, createEvent, events, setSelectedEventIndex, selectedEventIndex}}>
            {children}
        </ChatContext.Provider>
    );
};


