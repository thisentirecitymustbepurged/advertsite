import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Header } from '../components';

const App = props => (
  <MuiThemeProvider>
    <div className="app">
      <Header />
      { props.children }
    </div>
  </MuiThemeProvider>
);

export default App;
