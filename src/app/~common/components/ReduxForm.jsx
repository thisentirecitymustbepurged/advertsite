import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TextField from 'material-ui/TextField';

const generateFields = fieldData => fieldData.map(values => <CustomField {...values} />);

const ReduxForm = ({ handleSubmit, fieldData }) => (
  <form className="reduxForm" onSubmit={handleSubmit}>
    {generateFields([''])}
  </form>
);

export default reduxForm({ form: 'reduxForm' })(ReduxForm);
