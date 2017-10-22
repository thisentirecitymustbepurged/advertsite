import React from 'react';
import { Header } from '../components';

const App = props => (
  <div className="app">
    <Header />
    { props.children }
  </div>
);

export default App;
