import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversationsContext } from '../context/ConversationsProvider'

const OpenConversation = () => {
    const { sendMessage,selectedConversation } = useConversationsContext()
    const [text, setText] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(selectedConversation.recipients.map(r=>r.id),text)

        setText("")

    }
    return (
        <div className='d-flex flex-column flex-grow-1 '>
            <div className='d-flex flex-grow-1 overflow-auto'>
                p
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