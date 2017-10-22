import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as coreActions } from 'app/~core/actions';

const {
  toggleSideMenu
} = coreActions;

const style = {
  margin: '6px 16px 0 0'
};

const MainNav = ({ clickHandler }) => (
  <div>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  clickHandler: toggleSideMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(MainNav);
