import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const iconStyle = {
  color: 'rgba(255, 255, 255, 0.87)'
};

const SideMenuToggleButton = ({ clickHandler }) => (
  <IconButton iconStyle={iconStyle} onClick={clickHandler}>
    <MenuIcon />
  </IconButton>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(SideMenuToggleButton);