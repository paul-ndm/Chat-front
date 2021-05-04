import React, { useState, useEffect, useContext } from 'react';

const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState([
        {id: 'cdd9c00c-7a95-41b9-b11c-fbf157a48422' , messages: [], name: "gary", selected: true},
        {id: "3c890b82-8856-4bb4-81fd-9d6181d36e6d" , messages: [], name: "merry", selected: false},
        {id: 3 , messages: [], name: "joe", selected: false}
    ])
    const [selectedContactIndex, setSelectedContactIndex] = useState(0)

       // switch selected-property
   useEffect(()=> {
    const newContacts = contacts.map((contact, index) => {
      const { id, name, messages } = contact
      const selected = index === selectedContactIndex
      const newContact = { id, name, messages, selected}

      return newContact
    })
    setContacts(newContacts)
   }, [selectedContactIndex])

   // add new Contact
    const createContact = (id, name) => {

        const newContact = { id, name, messages: [], selected: true}

        setContacts(prev => {
            const oldContacts = prev.map( event => 
                {
                const { id, name, messages } = event
                return { id, name, messages, selected: false}
              })
            return [...oldContacts, newContact]
        })
        setSelectedContactIndex(contacts.length)
    } 

    return (
        <ContactContext.Provider value={{contacts, createContact, setContacts,
            selectedContactIndex, setSelectedContactIndex}}>
            {children}
        </ContactContext.Provider>
    );
};


