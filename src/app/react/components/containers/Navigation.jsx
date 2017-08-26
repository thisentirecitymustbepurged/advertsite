import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logOut } from '../../../api';

class Navigation extends Component {
  logOut(e) {
    e.preventDefault();
    logOut();
  }

  renderUserMenu(user) {
    if (user && Object.keys(user).length) {
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
            {user.email || user.displayName} <span className="caret" /></a>
          <ul className="dropdown-menu">
            <li><Link to="/user">Profile</Link></li>
            <li><Link to="/ad/create">Create New Ad</Link></li>
            <li role="separator" className="divider" />
            <li><a href="" onClick={this.logOut.bind(this)}>Logout</a></li>
          </ul>
        </li>
      );
    }
    return [
      <li key={'login'}><Link to="/login">Login</Link></li>,
      <li key={'register'}><Link to="/register">Register</Link></li>
    ];
  }

  render() {
    return (
      <div className="nav">
        <header className="navbar navbar-default navbar-fixed-top" id="top" role="banner">
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed"
                type="button"
                data-toggle="collapse"
                data-target=".bs-navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link to="/" className="navbar-brand">AdSite</Link>
            </div>
            <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
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

function mapStateToProps({ user: { data } }) {
  return {
    user: data,
  };
}

export default connect(mapStateToProps)(Navigation);
