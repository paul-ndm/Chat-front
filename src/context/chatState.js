import React, { useState, useEffect, useContext } from 'react';
import {useSocket} from './socketState'
import {useContacts} from './contactState'


const ChatContext = React.createContext()

export function useChat() {
    return useContext(ChatContext)
  }

export const ChatState = ({children}) => {
    const [messages, setMessages] = useState([])
    const [account, setAccount] = useState()
    const [events, setEvents ] = useState([])
    const [ lastMessage, setLastMessage] = useState()
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const [selectedEvent, setSelectedEvent ] = useState()
    const { socket } = useSocket()
    const { contacts } = useContacts()

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
      const newEvent = { recipients, messages, selected}
      if(newEvent.selected) {
        setSelectedEvent(newEvent)
      }
      return newEvent
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

      socket.on("receive-private-message", ({recipientId, text, sender}) => {
        setLastMessage({recipientId, text, sender})
      })
  
      return () => {socket.off('receive-message')
                    socket.off("receive-private-message")
    }

    },[socket])

    useEffect(()=> {
      if (lastMessage){
      const {recipientId, text, sender} = lastMessage
      
        // const targetContact = contacts.findIndex(contact => contact.id == recipientId)
        // console.log(targetContact)
        contacts.map(contact => {
          
          if(contact.id === recipientId ) {
            console.log(contact)
            contact.messages.push(text)
            
            return contact
          } else {

            return contact
          }
        })
}
    }, [lastMessage])

     const sendMessage = (recipients, text) => {
      socket.emit('send-message', { recipients, text})
      }

      const sendPrivateMessage = (recipientId, text) => {
        socket.emit('private-message', { recipientId, text})
        }

     const createEvent = (recipients) => {

        setEvents(prev => {
          const newEvent = { recipients, messages: [], selected: true}

          const oldEvents = prev.map( event => 
            {
            const { recipients, messages } = event
            return { recipients, messages, selected: false}
          } 
          )

          setSelectedEventIndex(oldEvents.length)
          setSelectedEvent(newEvent)

          return [...oldEvents, newEvent ]
        })
     }

    return (
        <ChatContext.Provider value={{account, setAccount, messages, getMessage, sendMessage, sendPrivateMessage, createEvent, events, setSelectedEventIndex, setSelectedEvent, selectedEvent}}>
            {children}
        </ChatContext.Provider>
    );
};


