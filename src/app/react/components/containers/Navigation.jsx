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
        <button onClick={this.props.logOut}>Logout</button>4
      </span>
    );
  }

  renderUserMenu(user) {
    if (user) {
      return (
        <li className="dropdown">
          <a
            href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false"
          >
            {user.email} <span className="caret" /></a>
          <ul className="dropdown-menu">
            <li><Link to="/profile">Profile</Link></li>
            <li role="separator" className="divider" />
            <li><Link to="/logout" >Logout</Link></li>
          </ul>
        </li>
      );
    } else {
      return [
        <li key={1}><Link to="/login">Login</Link></li>,
        <li key={2}><Link to="/register">Register</Link></li>,
      ];
    }
  }

  render() {
    return (
      <div>
        <header className="navbar navbar-static-top navbar-inverse" id="top" role="banner">
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed" type="button" data-toggle="collapse"
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
                <li><Link to="/"> Home</Link></li>,
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

export class MainNavigation extends Component {
  constructor() {
    super();
    this.state = {
      activeKey: '1',
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activeKey: eventKey });
    this.props.history.push('/user')
  }

  render() {
    return (
      <Nav
        bsStyle="tabs"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}>
        <NavItem eventKey="1">Home1</NavItem>
        <NavItem eventKey="2">Home2</NavItem>
        <NavItem eventKey="3">Home3</NavItem>
      </Nav>
    );
  }
}
