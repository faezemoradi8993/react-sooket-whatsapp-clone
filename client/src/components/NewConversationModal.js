import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useContactsContext } from '../context/ContactsProvider';
import { useConversationsContext } from '../context/ConversationsProvider';


const NewConversationModal = ({ closeModal }) => {
    const [selectedContactIds, setselectedContactIds] = useState([])
    const { contacts } = useContactsContext()
    const { createConversation } = useConversationsContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    const handleCheckBoxChange = (id) => {
        setselectedContactIds(pre => {
            if (pre?.includes(id)) { return pre?.filter(preId => preId !== id) } else {
                return [...pre, id]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton >
                Create Contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact) =>
                        <Form.Group key={contact.id} className="d-flex">
                            <Form.Check
                                type='checkbox'
                                value={selectedContactIds?.includes(contact.id)}
                                onChange={() => handleCheckBoxChange(contact.id)}
                            />
                            <Form.Label className='ms-2'>{contact.name}</Form.Label>
                        </Form.Group>)}
                    <Button type="submit" >Add</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewConversationModal