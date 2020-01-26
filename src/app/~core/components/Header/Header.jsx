import React from 'react';
import { connect } from 'react-redux';

const Header = ({ isLoggedIn }) => (
  <div className="header">Header</div>
);

const mapStateToProps = ({ core: { user: { isLoggedIn } } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Header);
