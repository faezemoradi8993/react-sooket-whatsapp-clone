import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversationsContext } from '../context/ConversationsProvider'

const Conversations = () => {
    const { conversations, selectConversationIndex } = useConversationsContext()
    return (
        <ListGroup variant='flush'>
            {conversations?.map((conversation, index) =>
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                >

                    {conversation.recipients.map(r => { return r.name }).join(", ")}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}

export default Conversations