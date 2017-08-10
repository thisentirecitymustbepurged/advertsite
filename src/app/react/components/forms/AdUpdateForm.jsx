import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Row, Col } from 'react-bootstrap';

class AdUpdateForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h1>Update Ad</h1>
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
          <Col md={3}>Category</Col>
          <Col md={9}>
            <Field
              className="form-control"
              name="category"
              component="select"
            >
              <option value=""></option>
              <option value="flat">Flat</option>
              <option value="house">House</option>
              <option value="cottage">Cottage</option>
            </Field>
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
          <Col md={3}>Description</Col>
          <Col md={9}>
            <Field
              className="form-control"
              name="desc"
              component="textarea"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} >
            <button
              className="btn btn-default"
              type="submit"

            >
              Submit
            </button>
            <button
              className="btn btn-default"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'adUpdateForm', // a unique identifier for this form
})(AdUpdateForm);
