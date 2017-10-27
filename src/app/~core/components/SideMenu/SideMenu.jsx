import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
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
    <div className="header">
      <Avatar
        src="/static/images/uxceo-128.jpg"
        className="avatar"
      />
      <span className="username">Jogintas Simutis</span>
      <Button onClick={clickHandler} raised className="logoutButton button">
        Log Out
      </Button>
    </div>
  </Drawer>
);

const mapStateToProps = ({ core: { showSideMenu } }) => ({
  showSideMenu
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
