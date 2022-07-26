import React, { useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useContactsContext } from './ContactsProvider';

export const conversationsContext = React.createContext()

export const useConversationsContext = () => { return useContext(conversationsContext) }


export const ConversationsContextProvider = ({ children, id }) => {
    const [conversations, setConversations] = useLocalStorage("conversations", [])
    const [selectConversationIndex, setSelectConversationIndex] = useState(0)
    const { contacts } = useContactsContext()

    const createConversation = (recipients) => setConversations(pre => { return [...pre, { recipients, messages: [] }] })

    const addMessageToConversation = ({ recipients, text, sender }) => {
        setConversations(prev => {

            let madeChange = false

            let newMessage = { sender, text }

            const newConversations = prev.map((conversation) => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation, messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation
            })

            if (madeChange) {
                return newConversations
            } else {
                return [...prev, { recipients, messages: [newMessage] }]
            }

        })

    }

    const sendMessage = (recipients, text) => {
        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversation = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recepient => {
            const contact = contacts.find(contact => {
                return contact.id === recepient
            })
            const name = (contact && contact.name) || recepient
            return { id: recepient, name }
        })
        const selected = index === selectConversationIndex
        return { ...conversation, recipients, selected }
    })

    const value = {
        conversations: formattedConversation,
        selectedConversation: formattedConversation[selectConversationIndex],
        selectConversationIndex: setSelectConversationIndex,
        createConversation,
        sendMessage
    }

    return (
        <conversationsContext.Provider value={value}>
            {children}
        </conversationsContext.Provider>
    )
}









const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false
    a.sort()
    b.sort()
    return a.every((element, index) => {
        return element === b[index]
    })
}
