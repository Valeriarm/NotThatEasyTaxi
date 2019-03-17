import React, { Component } from 'react';
import './App.css';
import SideBar from './componentes/SideBar';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LogIn from './componentes/LogIn';


function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={SideBar} />
        <Route path="/LogIn/" component={LogIn} />
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
