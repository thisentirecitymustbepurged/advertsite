import React, { Component } from 'react';

import Navigation from './components/Navigation';
import Calender from './components/Calender';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        { this.props.children }
        <Calender />
      </div>
    );
  }
}
