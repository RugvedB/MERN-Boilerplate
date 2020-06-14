import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import PasswordReset from './components/PasswordReset';
import SecuredPage from './components/SecuredPage';
import Auth from './HOC/Auth';
import OpenPage from './components/OpenPage';


function App() {
  return (
    <div className="App">
      
      <Router>
        <NavbarComponent />
        <Switch>
          
          <Route exact path="/register" component={Auth(Register,false)} />
          <Route exact path="/login" component={Auth(Login,false)} />
          <Route exact path="/passwordReset" component={Auth(PasswordReset,false)} />
          <Route exact path="/SecuredPage" component={Auth(SecuredPage,true)} />
          <Route exact path="/OpenPage" component={Auth(OpenPage,false)} />
          <Redirect  to="/404" component={<h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
