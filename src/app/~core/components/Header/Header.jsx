import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SideMenuToggleButton from './SideMenuToggleButton';
import NewAdButton from './NewAdButton';
import MainNav from './MainNav';

const Header = () => (
  <AppBar position="static" className="custom headerWrapper">
    <Toolbar className="custom header">
      <SideMenuToggleButton />
      <MainNav />
      <NewAdButton />
    </Toolbar>
  </AppBar>
);

export default Header;
