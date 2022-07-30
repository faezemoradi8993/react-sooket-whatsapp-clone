import React, { useState, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversationsContext } from '../context/ConversationsProvider'

const OpenConversation = () => {

    const [text, setText] = useState("")

    const { sendMessage, selectedConversation } = useConversationsContext()

    const handleSubmit = (e) => {

        e.preventDefault()
        sendMessage(selectedConversation.recipients.map(r => r.id), text)
        setText("")

    }

    const lastMessageRef = useCallback(node => {if (node) { node.scrollIntoView({ smoot: true }) }}  , [])

    return (
        <div className='d-flex flex-column flex-grow-1 '>
            <div className=' flex-grow-1 overflow-auto '>
                <div className='d-flex flex-column align-items-start justify-content-end px-3   '>
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div ref={lastMessage ? lastMessageRef : null} key={index} className={`my-1 d-flex flex-column   ${message.fromMe ? "align-self-end" : ""}`}>
                                <div className={`${message.fromMe ? "bg-primary text-white rounded px-2 py-1 " : "border"}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? " text-end" : ""}`}>
                                    {message.fromMe ? "You" : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit} className="m-2">
                <Form.Group>
                    <InputGroup>
                        <Form.Control as="textarea" required value={text} onChange={e => setText(e.target.value)} style={{ height: "75px", trsize: "none" }} />
                        <InputGroup.Text>
                            <Button type="submit" className='w-100 h-100 '>Send</Button>
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation