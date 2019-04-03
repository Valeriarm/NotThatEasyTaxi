import React, { Component } from 'react';
import './App.css';
import SideBar from './componentes/SideBar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Ingreso from './componentes/Ingreso';
import SelectUser from './componentes/SelectUser';
import FormUser from './componentes/FormUsuario';
import UserProfile from './componentes/UserProfile';



function AppRouter() {
  return (
    <Router>
      <div>
          <Route path="/" exact component={SelectUser} />
          <Route path="/Ingreso" exact component={Ingreso} />
          <Route path="/SideBar/" exact component={SideBar} />
          <Route path="/SelectUser/" exact component={SelectUser} />
          <Route path="/CreateUser/" exact component={FormUser}/>
          <Route path="/ProfileUser/" exact component={UserProfile}/>
      </div>
    </Router>
  );
}


class App extends Component {
  render() {
    return (
      <AppRouter/>
    );
  }
}

export default App;
