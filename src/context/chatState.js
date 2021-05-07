import React, { useState, useEffect, useContext } from 'react';
import {useSocket} from './socketState'
import {useContacts} from './contactState'
import { v4 as uuidV4 } from 'uuid'
import {useAuth } from './authState'
import { getEventsForUser, updatePrivateChat } from '../utils/api'

const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
  }

export const ChatState = ({children}) => {
    const [events, setEvents ] = useState([])
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const { socket } = useSocket()
    const { setContacts, contacts } = useContacts()
    const { currentUser } = useAuth()

   // switch selected-property
   useEffect(()=> {
    const newEvents = events.map((event, index) => {
      const { recipients, eventId, messages } = event
      const selected = index === selectedEventIndex
      const newEvent = { recipients, eventId, messages, selected}
      return newEvent
    })
    setEvents(newEvents)
   }, [selectedEventIndex])

   // getting all events of user
   useEffect(async()=> {
     if(currentUser){
    const joinedEvents = await getEventsForUser(currentUser.uid)
    setEvents(joinedEvents)}

   },[currentUser])


    // settiung up the socket for receving messages
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
          spreadContacts.map(contact => {
             if(contact.userId === sender) {
              console.log('message received from', sender, text.text)
               contact.messages.push(text)
               return contact
             } else {
               return contact
             }})
             updatePrivateChat(currentUser, spreadContacts)
             return spreadContacts
            })
            })
          
  
      return () => {socket.off('receive-message')
                    socket.off("receive-private-message")}
    },[socket])

    // sending messages
     const sendMessage = (eventId, recipients, text) => {
        socket.emit('send-message', {eventId, recipients, message: {text, id: currentUser.uid, name: currentUser.displayName}})
        }

      const sendPrivateMessage = (recipientId, text) => {
        socket.emit('private-message', { recipientId, text})
        }

      // create new Event
     const createEvent = (selectedContacts) => {
        const eventId = uuidV4()
        const recipients = [...selectedContacts, {id: currentUser.uid, name: currentUser.displayName }]
        const newEvent = { eventId, recipients, messages: [], selected: true}

        socket.emit('new-event', newEvent)

        setEvents(prev => {
          const oldEvents = prev.map( event => {
            const { eventId, recipients, messages } = event
            return { eventId, recipients, messages, selected: false}
          })

          setSelectedEventIndex(oldEvents.length)

          return [...oldEvents, newEvent ]
        })}

    return (
        <ChatContext.Provider value={{currentUser, sendMessage, sendPrivateMessage, createEvent, events, setSelectedEventIndex, selectedEventIndex}}>
            {children}
        </ChatContext.Provider>
    );
};


