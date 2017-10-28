import React from 'react';
import { Header } from '../components';

const App = props => (
  <div className="app">
    <Header />
    <main>
      { props.children }
    </main>
  </div>
);

export default App;
