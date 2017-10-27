import React from 'react';
import { Header, SideMenu } from '../components';

const App = props => (
  <div className="app">
    <Header />
    <SideMenu />
    { props.children }
  </div>
);

export default App;
