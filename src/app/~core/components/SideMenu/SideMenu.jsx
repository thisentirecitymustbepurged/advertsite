import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { Creators as coreActions } from 'app/~core/actions';
import SideHeader from './SideHeader';
import UserNavigationMenu from './UserNavigationMenu';

const {
  toggleSideMenu
} = coreActions;

const SideMenu = ({ showSideMenu, clickHandler }) => (
  <Drawer
    className="custom sideMenu"
    open={showSideMenu}
    onRequestClose={clickHandler}
  >
    <SideHeader />
    <UserNavigationMenu />
  </Drawer>
);

const mapStateToProps = ({ core: { showSideMenu } }) => ({
  showSideMenu
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
