import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';

import {
  loginWithProvider,
} from '../../../api';

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <form id="frmRegister" role="form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="form-group">
                <label htmlFor="txtRegEmail">Email address</label>
                <Field
                  component="input"
                  type="email"
                  className="form-control"
                  id="txtEmail" placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="txtRegPass">Password</label>
                <Field
                  component="input"
                  type="password" className="form-control" id="txtPass" placeholder="Password"
                  name="password"
                />
              </div>
              <button
                type="submit" className="btn btn-default btn-block"
                disabled={pristine || submitting}>
                Login
              </button>
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
              onClick={() => loginWithProvider('google')}>
              <span className="fa fa-google"></span> Sign in with Google
            </button>
            <button
              className="btn btn-block btn-social btn-twitter"
              onClick={() => loginWithProvider('twitter')}>
              <span className="fa fa-twitter"></span> Sign in with Twitter
            </button>
            <button
              className="btn btn-block btn-social btn-github"
              onClick={() => loginWithProvider('github')}>
              <span className="fa fa-github"></span> Sign in with Github
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(LoginForm);
