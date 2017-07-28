import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {

  userExists() {
    if (this.props.username === undefined) {
      return <Link to="/user">Login</Link>;
    }
    return (
      <span>
        <Link to="/user"> Logged in as {this.props.username} </Link>

      </span>
    );
  }

  renderUserMenu(user) {
    if (user) {
      return (
        <li className="dropdown">
          <a
            href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">
            {user.email}
            <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li><Link to="/user">Profile</Link></li>
            <li role="separator" className="divider" />
            <li><a href="" onClick={this.props.logOut}>Logout</a></li>
          </ul>
        </li>
      );
    } else {
      return [
        <li key={1}>Login</li>,
        <li key={2}><Link to="/user">Register</Link></li>,
      ];
    }
  }

  render() {
    return (
      <div>
        <header className="navbar navbar-static-top navbar-inverse" id="top" role="banner">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Firebase & Redux boilerplate</Link>
            </div>
            <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
              <ul className="nav navbar-nav">
                <li><Link exact to="/">Home</Link></li>,
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
