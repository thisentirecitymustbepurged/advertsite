import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ChangePassword extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form id="ChangePassword" role="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password"> New Password: </label>
          <Field
            component="input"
            type="password"
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword"> Repeat Password: </label>
          <Field
            component="input"
            type="password"
            className="form-control"
            name="repeatPassword"
            id="repeatPassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'changePassword', // a unique identifier for this form
})(ChangePassword);
