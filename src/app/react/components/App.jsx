import React, { Component } from 'react';

import Navigation from './containers/Navigation';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        { this.props.children }
      </div>
    );
  }
}

export default App;
