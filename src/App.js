import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import useAuthContext from './hooks/useAuthContext';
function App() {

  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
    { authIsReady && (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {/* {user && <Home></Home>}
              {!user && <Redirect to="/login"/>} */}
              <Home/>
            </Route>
            <Route path="/login">
              {!user && <Login></Login>}
              {user && <Home />}
            </Route>
            <Route path="/signup">
              {!user && <Signup></Signup>}
              {user && <Redirect to="/home"/>}
            </Route>
          </Switch>
        </Router>
      )}
      </div>
    );
}

export default App
