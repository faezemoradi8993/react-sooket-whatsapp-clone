import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation';
import { useConversationsContext } from '../context/ConversationsProvider';


const Dashboard = ({ id }) => {

    const { selectedConversation } = useConversationsContext()
    console.log(selectedConversation);
    return (
        <div style={{ "height": "100vh" }} className="d-flex ">
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    )
}

export default Dashboard