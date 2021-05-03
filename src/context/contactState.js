import React, { useState, useEffect, useContext } from 'react';

const ContactContext = React.createContext()

export function useContacts() {
    return useContext(ContactContext)
  }

export const ContactState = ({children}) => {

    const [contacts, setContacts] = useState([])


    const createContact = (id, name) => {

        if(contacts) {
            setContacts(prev => {
                return [...prev, { id, name}]
            })
        } else {
            setContacts({ id, name})
        }


    } 



    return (
        <ContactContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactContext.Provider>
    );
};


