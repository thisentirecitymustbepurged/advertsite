import React, { Component } from 'react';
import { Link } from 'react-router';

import { Grid, Row, Col } from 'react-bootstrap';

import { loginWithProvider } from '../../../api';

export default class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
              <p>
              </p>
              <h1>Login</h1>
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
              <h5><Link to="/reset">Forgot password?</Link></h5>
              <br />
            </form>
            <h4>Login with:</h4>
            <button
              className="btn btn-block btn-social btn-facebook"
              onClick={() => loginWithProvider('facebook')}>
              <span className="fa fa-facebook"></span> Sign in with Facebook
            </button>
            <button
              className="btn btn-block btn-social btn-google"
              onClick={() => loginWithProvider('facebook')}>
              <span className="fa fa-google"></span> Sign in with Facebook
            </button>
            <button
              className="btn btn-block btn-social btn-twitter"
              onClick={() => loginWithProvider('facebook')}>
              <span className="fa fa-twitter"></span> Sign in with Facebook
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
