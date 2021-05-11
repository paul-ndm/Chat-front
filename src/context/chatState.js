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

   // getting all events of user
   useEffect(async()=> {
     if(currentUser){
    const joinedEvents = await getEventsForUser(currentUser.uid)
    setEvents(joinedEvents)}

   },[currentUser])


    // settiung up the socket for receving messages
    useEffect(()=> {
      if (socket == null) return 

      socket.on('added-Member', ({eventId, newMembers}) => {
        console.log('new Members:', newMembers ,eventId  )
        setEvents(prev => {
          return prev.map(event => {
             if(event.eventId === eventId) {
               newMembers.forEach(member => {
                event.recipients.push(member)
               })
               return event
             } else {
               return event
             }})})


      })

      socket.on('receive-message', ({eventId, recipients, sender, message}) => {
        setEvents(prev => {
          const updatedEvent =  prev.map(event => {
             if(event.eventId === eventId) {
              event.messages.push(message)
               return event
             } else {
               return event
             }})
          console.log(updatedEvent)
            }
             
             
             )
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

      socket.on("new-event", createdEvent => {
        setEvents(prev => {
          setSelectedEventIndex(prev.length)
          return [...prev, createdEvent ]
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
     const createEvent = (selectedContacts, details) => {
        const eventId = uuidV4()
        const { name, place, date } = details
        const recipients = [...selectedContacts, {id: currentUser.uid, name: currentUser.displayName }]
        const newEvent = { eventId, recipients, messages: [], name, place, date}

        socket.emit('new-event', newEvent)

        setEvents(prev => {
          setSelectedEventIndex(prev.length)
          return [...prev, newEvent ]
        })
      }

      const addMember = (newMembers) => {

        socket.emit('add-member', { event: events[selectedEventIndex], newMembers })

        newMembers.forEach( member => {
          events[selectedEventIndex].recipients.push(member)
        })

      }

          // delete Contact locally
    const removeLocalEvent = (event) => {
      setEvents(prev => {
          const newEvents = prev.filter( e => e.eventId !== event.eventId)
          return [...newEvents]
      })
      setSelectedEventIndex(events.length - 2)

  }

    return (
        <ChatContext.Provider value={{currentUser, addMember, sendMessage, sendPrivateMessage, createEvent, events, removeLocalEvent, setSelectedEventIndex, selectedEventIndex}}>
            {children}
        </ChatContext.Provider>
    );
};


