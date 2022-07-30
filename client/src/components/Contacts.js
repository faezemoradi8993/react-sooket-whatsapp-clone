import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { useContactsContext } from '../context/ContactsProvider';

const Contacts = () => {
    const { contacts } = useContactsContext()
    return (
        <ListGroup variant='flush'>
            {contacts?.map(item => <ListGroup.Item key={item.id}>{item?.name}</ListGroup.Item>)}
        </ListGroup>

    )
}

export default Contacts