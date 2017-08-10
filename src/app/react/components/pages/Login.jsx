import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';

import {
  loginWithProvider,
  loginWithEmail
} from '../../../api';

import LoginForm from '../forms/LoginForm'

export default class Login extends Component {
  loginWithEmail(values) {
    debugger;
    loginWithEmail(values);
  }
  render() {
    return (
      <LoginForm onSubmit={this.loginWithEmail.bind(this)}/>
    );
  }
}
