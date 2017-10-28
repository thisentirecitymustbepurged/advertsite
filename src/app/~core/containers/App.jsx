import React from 'react';
import { Header, SideMenu } from '../components';

const App = props => (
  <div className="app">
    <Header />
    <SideMenu />
    <main>
      { props.children }
    </main>
  </div>
);

export default App;
