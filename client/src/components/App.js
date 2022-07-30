
import '../App.css';
import Login from './Login';
import { useLocalStorage } from './../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactContextProvider } from './../context/ContactsProvider';
import { ConversationsContextProvider } from './../context/ConversationsProvider';
import { SocketProvider } from '../context/SocketProvider';


function App() {
  const [id, setId] = useLocalStorage("id")

  const dashboard = (
    <SocketProvider id={id} >
    <ContactContextProvider>
      <ConversationsContextProvider id={id}>
        <Dashboard id={id} />
      </ConversationsContextProvider>
    </ContactContextProvider>
    </SocketProvider>
  )

  return (<>
    {id ? dashboard : <Login setId={setId} />}

  </>)
}

export default App;
