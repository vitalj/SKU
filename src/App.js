import React, { Component } from 'react';
import './App.css';
import MonthTable from './components/MonthTable';
import TrimestreTable from './components/TrimestreTable';
import Home from './components/Home';

import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";

  class Main extends Component {
    render() {
      
      return (
        <HashRouter>
            <nav id="navbar">
            <li className="SKU"><NavLink to="/">SKU SCIENCE</NavLink></li>
            <div className="nav-wrapper">
              <li><NavLink to="/Mensuels">Résultats Mensuels</NavLink></li>
              <li><NavLink to="/Trimestriels">Résulats Trimestriels</NavLink></li>
              </div>


              <Route exact path="/" component={Home}/>
<Route exact path="/Mensuels" component={MonthTable}/>
<Route path="/Trimestriels" component={TrimestreTable}/>
</nav>

        </HashRouter>
      );
    }
  }
export default Main;
