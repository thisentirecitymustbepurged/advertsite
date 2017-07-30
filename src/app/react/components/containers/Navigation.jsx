import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import {
  logoutUserSuccess,
  logoutUserFailure,
} from '../../../redux/userAuth/actionCreators';

class Navigation extends Component {
  logOut() {
    return auth.logoutUser().then(
      () => this.props.logoutUserSuccess(),
      () => this.props.logoutUserFailure(),
    );
  }

  renderUserMenu(user) {
    if (user) {
      return (
        <li className="dropdown">
          <a
            href=""
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user.email} <span className="caret" /></a>
          <ul className="dropdown-menu">
            <li><Link to="/user">Profile</Link></li>
            <li role="separator" className="divider" />
            <li><a href="" onClick={this.logOut}>Logout</a></li>
          </ul>
        </li>
      );
    }
    return [
      <li key={1}>Login</li>,
      <li key={2}><Link to="/user">Register</Link></li>,
    ];
  }

  render() {
    return (
      <div>
        <header className="navbar navbar-static-top navbar-inverse" id="top" role="banner">
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed"
                type="button"
                data-toggle="collapse"
                data-target=".bs-navbar-collapse"
              ><span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link to="/" className="navbar-brand">Firebase & Redux boilerplate</Link>
            </div>
            <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>,
              </ul>
              <ul className="nav navbar-nav navbar-right">
                { this.renderUserMenu(this.props.user) }
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUserSuccess,
    logoutUserFailure,
  }, dispatch);
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
