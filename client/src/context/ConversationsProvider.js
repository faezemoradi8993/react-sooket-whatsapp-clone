import React, { useContext, useState, useEffect,useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useContactsContext } from './ContactsProvider';
import { useSocket } from './SocketProvider';

export const conversationsContext = React.createContext()

export const useConversationsContext = () => { return useContext(conversationsContext) }


export const ConversationsContextProvider = ({ children, id }) => {
    const [conversations, setConversations] = useLocalStorage("conversations", [])
    const [selectConversationIndex, setSelectConversationIndex] = useState(0)
    const { contacts } = useContactsContext()
    const { socket } = useSocket()

    const createConversation = (recipients) => setConversations(pre => { return [...pre, { recipients, messages: [] }] })

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversation => {

            let madeChange = false

            let newMessage = { sender, text }

            const newConversations = prevConversation.map((conversation) => {
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
                return [...prevConversation, { recipients, messages: [newMessage] }]
            }

        })

    },[setConversations])

    useEffect(() => {
        if (socket == null) return
        
        socket.on("receive-message", addMessageToConversation)

        return () => {
            socket.off('receive-message')
        }
        
    }, [addMessageToConversation, socket])


    const sendMessage = (recipients, text) => {
        addMessageToConversation({ recipients, text, sender: id })
        socket.emit("send-message", { recipients, text })
    }

    const formattedConversation = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recepient => {
            const contact = contacts.find(contact => {
                return contact.id === recepient
            })
            const name = (contact && contact.name) || recepient
            return { id: recepient, name }
        })
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })
        const selected = index === selectConversationIndex
        return { ...conversation, messages, recipients, selected }
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
