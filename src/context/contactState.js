import React, { useState, useEffect, useContext } from 'react';

const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState([])
    const [selectedContactIndex, setSelectedContactIndex] = useState(0)
    const [selectedContact, setSelectedContact ] = useState()

       // switch selected-property
   useEffect(()=> {

    console.log('hi')
    
        const newContacts = contacts.map((contact, index) => {
      const { id, name, messages } = contact
      const selected = index === selectedContactIndex
      const newContact = { id, name, messages, selected}
      if(newContact.selected) {
        setSelectedContact(newContact)
      }
      return newContact
    })
    setContacts(newContacts)

   }, [selectedContactIndex])

    const createContact = (id, name) => {

        const newContact = { id, name, messages: [], selected: true}
        setSelectedContact(newContact)

        if(contacts !== []) {
            
            setContacts(prev => {
                const newContact = { id, name, messages: [], selected: true}
                const oldContacts = prev.map( event => 
                    {
                    const { id, name, messages } = event
                    return { id, name, messages, selected: false}
                  })
                  setSelectedContactIndex(oldContacts.lenght)

                return [...oldContacts, newContact]
            })
        } else {
            setContacts(newContact)
        }


    } 



    return (
        <ContactContext.Provider value={{contacts, createContact, selectedContact,setSelectedContact, setSelectedContactIndex}}>
            {children}
        </ContactContext.Provider>
    );
};


