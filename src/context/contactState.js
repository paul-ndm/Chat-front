import React, { useState, useEffect, useContext } from 'react';

const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState([])
    const [selectedContactIndex, setSelectedContactIndex] = useState(0)
    //const [selectedContact, setSelectedContact ] = useState()

       // switch selected-property
   useEffect(()=> {
    const newContacts = contacts.map((contact, index) => {
      const { id, name, messages } = contact
      const selected = index === selectedContactIndex
      const newContact = { id, name, messages, selected}
    //   if(newContact.selected) {
    //     setSelectedContact(newContact)
    //   }
      return newContact
    })
    setContacts(newContacts)

   }, [selectedContactIndex])

   // add new Contact
    const createContact = (id, name) => {

        const newContact = { id, name, messages: [], selected: true}
        //setSelectedContact(newContact)
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
        <ContactContext.Provider value={{contacts, createContact, 
            // selectedContact,setSelectedContact, 
            selectedContactIndex, setSelectedContactIndex}}>
            {children}
        </ContactContext.Provider>
    );
};


