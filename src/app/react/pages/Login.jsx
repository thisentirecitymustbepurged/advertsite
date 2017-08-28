import React, { Component } from 'react';
import { loginWithEmail } from '../../api';
import LoginForm from '../components/forms/LoginForm';

export default class Login extends Component {
  loginWithEmail(values) {
    loginWithEmail(values);
  }
  render() {
    return (
      <LoginForm onSubmit={this.loginWithEmail.bind(this)} />
    );
  }
}
