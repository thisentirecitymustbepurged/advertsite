import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const SideMenuToggleButton = ({ clickHandler }) => (
  <IconButton color="contrast" onClick={clickHandler} className="sideMenuToggleButton">
    <MenuIcon />
  </IconButton>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(SideMenuToggleButton);
