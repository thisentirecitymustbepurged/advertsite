import React from 'react';
import { bindActionCreators } from 'redux';
import Toolbar from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const SideMenu = ({ showSideMenu, clickHandler }) => (
  <Drawer
    className="custom sideMenu"
    open={showSideMenu}
    onRequestClose={clickHandler}
  >
    <Toolbar className="header" />
  </Drawer>
);

const mapStateToProps = ({ core: { showSideMenu } }) => ({
  showSideMenu
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
