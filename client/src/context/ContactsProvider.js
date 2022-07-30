import React, { useContext } from 'react'
import { useLocalStorage } from './../hooks/useLocalStorage';


export const contactsContext = React.createContext()

export const useContactsContext=()=>{return useContext(contactsContext)}

export const ContactContextProvider = ({ children }) => {
    const [contacts, setContacts] = useLocalStorage("contacts", [])
    const createContact = (id, name) => {
        setContacts(pre =>  [...pre, { id, name }])
    }
    return (
        <contactsContext.Provider value={{ contacts, createContact }}>{children}</contactsContext.Provider>
    )
}
