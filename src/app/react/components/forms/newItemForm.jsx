import React from 'react';
import { Field, reduxForm } from 'redux-form';

const adaptFileEventToValue = delegate => {
  return e => delegate(e.target.files[0]);
}

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) => {
  return <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
};

const NewItemForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Item Name"
        />
      </div>
      <div>
        <Field
          name="image"
          component={FileInput}
        />
      </div>
      <img alt="" id="previewImg" />
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
