import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Firebase from '../../../firebase/firebase';

class loginWithProviders extends Component {
  render() {
    return (
      <div>
        <button onClick={}>Facebook</button>
      </div>
    );
  }
}

export default class User extends Component {
  render() {
    return (
      <div>
        <div>User</div>
        <Route path="/user/login" component={loginWithProviders}/>
      </div>
    );
  }
}
