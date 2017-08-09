import React, { Component } from 'react';
import { Link } from 'react-router';

import { loginWithProvider } from '../../../api';

export default class Login extends Component {
  render() {
    return (
      <div className="col-md-4">
        <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
          <p>
          </p>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="txtEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="txtEmail" placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtPass">Password</label>
            <input
              type="password" className="form-control" id="txtPass" placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-default btn-block">Login</button>
          <br />
          <h5><Link to="/reset">Forgot password?</Link></h5>

          <h4>Login with</h4>
          <a
            href="" className="btn btn-block btn-social btn-facebook" onClick={() => {
              loginWithProvider('facebook');
            }} data-provider="facebook"
          >Facebook</a>

          <a
            href="" className="btn btn-block btn-social btn-twitter" onClick={() => {
              loginWithProvider('twitter');
            }} data-provider="twitter"
          >Twitter</a>

          <a
            href="" className="btn btn-block btn-social btn-google" onClick={() => {
              loginWithProvider('google');
            }} data-provider="google"
          >Google</a>

          <a
            href="" className="btn btn-block btn-social btn-github" onClick={() => {
              loginWithProvider('github');
            }} data-provider="github"
          >Github</a>
        </form>
      </div>
    );
  }
}
