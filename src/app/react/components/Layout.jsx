import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Navigation from './containers/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User'

export default class Layout extends Component {
  render() {
    return (
    <div>
      <Route path="/" component={Navigation} />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/user" component={User} />    
    </div>
    );
  }
}
