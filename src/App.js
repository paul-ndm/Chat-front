import Contacts from './components/contacts/contacts'
import Login from './components/login'
import Dashboard from './components/events/dashboard'
import { useChat } from './context/chatState'
import { Switch, Route, Redirect } from "react-router-dom";
import { Container} from 'react-bootstrap'
import Signup from './components/Signup'

function App() {

 const { account } = useChat()

  return (
    <div>

    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "400px"}}> 
    <Signup/>
    </div>
    </Container>

    <Switch>
    
    <Route path='/chat'>
      <Contacts />
      <br />
      <Dashboard />
    </Route>
    <Route path='/'>
    {account ? <Redirect to="/chat"/> : <Login /> }
    </Route>

    </Switch>
    </div>
  );
}

export default App;
