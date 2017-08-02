import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {Row, Col} from 'react-bootstrap';

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
      <h1>New Ad</h1>
      <Row>
        <Col md={3}>Title</Col>
        <Col md={9}>
          <Field
            className="form-control"
            name="title"
            component="input"
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>Location</Col>
        <Col md={9}>
          <Field
            className="form-control"
            name="address"
            component="input"
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>Contact</Col>
        <Col md={9}>
          <Field
            className="form-control"
            name="phone"
            component="input"
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>Pricing</Col>
        <Col md={9}>
          <Field
            className="form-control"
            name="price"
            component="input"
            type="text"
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>Description</Col>
        <Col md={9}>
          <Field
            className="form-control"
            name="desc"
            component="textarea"
            type="text"          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>Picture</Col>
        <Col md={9}>
          <Field
            name="image"
            component={FileInput}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} >
          <button
            className="btn btn-primary"
            type="submit"
            disabled={pristine || submitting}>
            Submit
          </button>
          <button
            className="btn btn-primary"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear Values
          </button>
        </Col>
      </Row>

    </form>
  );
};

export default reduxForm({
  form: 'NewAdForm', // a unique identifier for this form
})(NewAdForm);
