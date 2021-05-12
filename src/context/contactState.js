import React, { useState, useContext } from 'react';

const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState([])
    const [selectedContactIndex, setSelectedContactIndex] = useState(0)

   // add new Contact
    const createContact = (addedUser) => {
        setContacts(prev => {
            return [...prev, addedUser]
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


