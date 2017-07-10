import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/user"> Login </Link>
      </div>
    );
  }
}