import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
  userExists() {
    // console.log("userExistsNav")
    if (this.props.username === undefined) {
      console.log("NavIfTrue " + this.props.user) 
      return <Link to="/user">Login</Link>;           
    } else {
      console.log("NavIfFalse " + this.props.username)
      return (
        <span>
          <Link to="/user">{this.props.username}</Link>
          <button onClick={this.props.logOut}>Logout</button>
        </span>
      ); 
    }
  }

  render() {
    return (
      <div>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        { this.userExists() }
      </div>
    );
  }
}