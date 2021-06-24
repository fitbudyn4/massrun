import logo from './logo.svg';
import './App.css';
import AthleteComponent from "./components/Participants/AthleteComponent";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./components/Login/Login";
import Register from './components/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import AthleteService from './services/AthleteService';



function App() {

  const[loggedUser, setLoggedUser] = useState(null);

  useEffect(()=> {
    if(AthleteService.getLocal() !== null)
    {
      setLoggedUser(AthleteService.getLocal());
    }
  }, []);
  
  return (
    
    <div className="App">
      <Router>
        <NavigationBar loggedUser = {loggedUser} setLoggedUser = {setLoggedUser}/>
        <Switch>
          <Route exact path='/' component={() => <Home loggedUser = {loggedUser}/>} />
          <Route exact path='/login' component={() => <Login setLoggedUser = {setLoggedUser}/>} />
          <Route exact path='/athlete' component={AthleteComponent} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/about' component={AboutUs} />
      
        </Switch>

        </Router>
    </div>
    
  );
}

export default App;
