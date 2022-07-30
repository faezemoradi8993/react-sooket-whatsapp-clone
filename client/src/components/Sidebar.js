import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from "react-bootstrap"
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal';
const CONVERSATION_KEY = "conversations"
const CONTACTS_KEY = "contacts"

const Sidebar = ({ id }) => {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const closeModal=()=>{setModalOpen(false)}
    const ConversationIsOpen = activeKey === CONVERSATION_KEY
    return (
        <div style={{ "width": "250px" }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant='tabs' className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY} >Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY} >Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-end overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATION_KEY} className="p-2" >
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY} className="p-2">
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='border-top border-end p-2 small' >your ID: <span className='text-muted '>{id}</span></div>
                <Button onClick={()=>setModalOpen(true)} className='rounded-0'>
                    New {ConversationIsOpen ? "Conversation" : "Contact"}
                </Button>
            </Tab.Container>
            <Modal onS show={modalOpen} onHide={closeModal} >
                {ConversationIsOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />}
            </Modal>
        </div>
    )
}

export default Sidebar