import Contacts from './components/contacts/contacts'
import Dashboard from './components/events/dashboard'
import { useChat } from './context/chatState'
import { useAuth } from './context/authState'
import { Switch, Route, Redirect } from "react-router-dom";
import { Container} from 'react-bootstrap'
import Signup from './components/Account/Signup'
import GoogleLogIn from './components/Account/googleLogin'
import Logout from './components/Account/logout'

function App() {

 const { account } = useChat()
 const { currentUser } = useAuth()

  return (
    <div>

    <Switch>
    
    <Route path='/chat'>
      <Logout />
      <br />
      <Contacts />
      <br />
      <Dashboard />
    </Route>
    <Route path='/'>
    {currentUser   ? <Redirect to="/chat"/> : <GoogleLogIn/> }
    </Route>

    </Switch>
    </div>
  );
}

export default App;


