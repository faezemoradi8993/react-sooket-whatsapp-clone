import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContactsContext } from '../context/ContactsProvider';

const NewContactModal = ({ closeModal }) => {
    const { createContact } = useContactsContext()

    const idRef = useRef()
    const nameRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        createContact(idRef.current.value,nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton >
                Create Contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>  Id</Form.Label>
                        <Form.Control type='text' ref={idRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>  Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} />
                    </Form.Group>
                    <Button type="submit" className='mt-2' >Add</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewContactModal