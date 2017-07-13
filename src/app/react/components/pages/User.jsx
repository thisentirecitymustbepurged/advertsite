import React, { Component } from 'react'

export default class User extends Component {
  userExists() {
    // console.log('userExistsUser')
    if (this.props.username === undefined) { 
      console.log("UserIfTrue " + this.props.username)
      return (
        <div>
          <div>Please login:</div>
          <button onClick={this.props.loginWithFacebook}>Facebook</button>
        </div>
      );
    } else {
      console.log("UserIfFalse " + this.props.username)
      return (
        <span>
          <div>{this.props.username}</div>
        </span>
      ); 
    }
  }

  render() {    
    return (
      <div>        
        {this.userExists()}      
      </div>
    );
  }
}