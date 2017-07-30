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

const NewAdForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="title"
          component="input"
          type="text"
          placeholder="title"
        />
      </div>
      <div>
        <Field
          name="address"
          component="input"
          type="text"
          placeholder="address"
        />
      </div>
      <div>
        <Field
          name="phone"
          component="input"
          type="text"
          placeholder="phone"
        />
      </div>
      <div>
        <Field
          name="price"
          component="input"
          type="text"
          placeholder="price"
        />
      </div>
      <div>
        <Field
          name="desc"
          component="textarea"
          type="text"
          placeholder="desc"
        />
      </div>
      <div>
        <Field
          name="image"
          component={FileInput}
        />
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
  form: 'NewAdForm', // a unique identifier for this form
})(NewAdForm);
