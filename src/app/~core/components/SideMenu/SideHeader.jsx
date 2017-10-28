import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const SideHeader = ({ clickHandler }) => (
  <div className="sideHeader">
    <Avatar
      src="/static/images/uxceo-128.jpg"
      className="avatar"
    />
    <span className="username">Jogintas Simutis</span>
    <Button onClick={clickHandler} raised className="logoutButton button">
      Log Out
    </Button>
  </div>
);

// const mapStateToProps = ({ core: { showSideMenu } }) => ({
//   showSideMenu
// });

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(SideHeader);
