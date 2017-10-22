import React, { Component } from 'react';
import { registerWithEmail } from '../../api';
import RegisterForm from '../components/forms/RegisterForm';

export default class Register extends Component {
  registerWithEmail(values) {
    registerWithEmail(values);
  }
  render() {
    return (
      <RegisterForm onSubmit={this.registerWithEmail.bind(this)} />
    );
  }
}
