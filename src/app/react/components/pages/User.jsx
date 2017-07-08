import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Firebase from '../../../firebase/firebase';

class loginWithProviders extends Component {

  loginWithFacebook () {    
  }

  render() {
    return (
      <div>
        <button onClick={this.loginWithFacebook}>Facebook</button>
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

import { createStore } from 'redux'

function counter(state = 0, action) {
  switch(action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;  
  }
}

const store = createStore(counter)

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: 'inc' })
store.dispatch({ type: 'inc' })
store.dispatch({ type: 'dec' })