import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <form id="frmRegister" role="form" onSubmit={handleSubmit}>
              <h1>Register</h1>
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
                Register
              </button>
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

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
})(RegisterForm);
