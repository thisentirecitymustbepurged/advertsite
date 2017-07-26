import React from 'react';
import { Field, reduxForm } from 'redux-form';

const NewItemForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Item Name"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'NewItemForm', // a unique identifier for this form
})(NewItemForm);
