import React, { Component } from 'react';
import './App.css';
import SideBar from './componentes/SideBar';
import SideBarDriver from './componentes/SideBarDriver'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Ingreso from './componentes/Ingreso';
import SelectUser from './componentes/SelectUser';
import FormUser from './componentes/FormUsuario';
import UserProfile from './componentes/UserProfile';
import DriverProfile from './componentes/DriverProfile';
import Taxi from './componentes/Taxi';
import AddTaxi from './componentes/AddTaxi';
import RegisterTaxi from './componentes/RegisterTaxi';
import SearchTaxi from './componentes/SearchTaxi';



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
          <Route path="/SideBarDriver/" exact component={SideBarDriver}/>
          <Route path="/ProfileDriver/" exact component={DriverProfile}/>
          <Route path="/Taxi/" exact component={Taxi}/>
          <Route path="/CreateTaxi/" exact component={AddTaxi}/>
          <Route path="/RegisterTaxi/" exact component={RegisterTaxi}/>
          <Route path="/SearchTaxi/" exact component={SearchTaxi}/>

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
