import React, { Component } from 'react';

import { loginWithProvider } from '../../../api';

export default class Login extends Component {
  render() {
    return (
      <button onClick={() => loginWithProvider('facebook')}>Facebook</button>
    );
  }
}
