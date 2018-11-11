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
          <div>
            <ul className="header">
            <nav id="navbar">
            <div className="nav-wrapper">
            <li className="SKU"><NavLink to="/">SKU SCIENCE</NavLink></li>
              <li><NavLink to="/Mensuels">Résultats Mensuels</NavLink></li>
              <li><NavLink to="/Trimestriels">Résulats Trimestriels</NavLink></li>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Mensuels" component={MonthTable}/>
            <Route path="/Trimestriels" component={TrimestreTable}/>
              </div>
              </nav>
            </ul>
            <div className="content">
            </div>
          </div>
        </HashRouter>
      );
    }
  }


export default Main;
