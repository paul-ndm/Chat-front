import React, { useState, useEffect, useContext } from 'react';



const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState(
        [
        // {id:  "8j2BqDi6NbOjYZHPzDWTSukbtaA3", messages: [], name: "Tin Tin", selected: true},
        // {id: "q8ZZmMiEzyUZErHrxFKhqg0iI4C2" , messages: [], name: "Paul Mont", selected: false}
    ]
    )
    const [selectedContactIndex, setSelectedContactIndex] = useState(0)

       // switch selected-property
   useEffect(()=> {
    const newContacts = contacts.map((contact, index) => {
      const { userId, name, messages } = contact
      const selected = index === selectedContactIndex
      const newContact = { userId, name, messages, selected}
      return newContact
    })
    setContacts(newContacts)
   }, [selectedContactIndex])

   // add new Contact
    const createContact = ({userId, name}) => {

        const newContact = { userId, name, messages: [], selected: true}

        setContacts(prev => {
            const oldContacts = prev.map( contact => 
                {
                const { userId, name, messages } = contact
                return { userId, name, messages, selected: false}
              })
            return [...oldContacts, newContact]
        })
        setSelectedContactIndex(contacts.length)
    }
    // delete Contact locally
    const removeLocalContact = (contact) => {
        setContacts(prev => {
            const newContacts = prev.filter( c => c.userId !== contact.userId)
            console.log(newContacts)
            return [...newContacts]
        })
        setSelectedContactIndex(contacts.length - 2)

    }

    return (
        <ContactContext.Provider value={{contacts, createContact, setContacts, removeLocalContact,
            selectedContactIndex, setSelectedContactIndex}}>
            {children}
        </ContactContext.Provider>
    );
};


