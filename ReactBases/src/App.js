import React, { Component } from 'react';
import './App.css';
import SideBar from './componentes/SideBar';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LoginTab from './componentes/Ingreso';
import Ingreso from './componentes/Ingreso';



function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Ingreso} />
        <Route path="/SideBar/" exact component={SideBar} />
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
