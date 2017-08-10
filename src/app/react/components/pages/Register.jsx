import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';

import {
  loginWithProvider,
  registerWithEmail
} from '../../../api';

import RegisterForm from '../forms/RegisterForm'

export default class Register extends Component {
  registerWithEmail(values) {
    debugger;
    registerWithEmail(values);
  }
  render() {
    return (
      <RegisterForm onSubmit={this.registerWithEmail.bind(this)}/>
    );
  }
}
