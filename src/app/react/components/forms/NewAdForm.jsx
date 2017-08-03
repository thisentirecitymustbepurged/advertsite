import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Row, Col, Image } from 'react-bootstrap';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

class NewAdForm extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: undefined,
    };
  }
  renderSelectedImage() {
    if (
      this.props.newAdForm
      && this.props.newAdForm.values
      && this.props.newAdForm.values.image
    ) {
      if (this.state.imgSrc) {
        return (
          <Row>
            <Col sm={4} md={3} className="selected_image">
              <Image src={this.state.imgSrc} width="100%" />
            </Col>
          </Row>
        );
      }
      const fr = new FileReader(); //eslint-disable-line
      fr.onload = e => this.setState({ imgSrc: e.target.result });
      fr.readAsDataURL(this.props.newAdForm.values.image);
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
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
              type="text"
            />
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
        {
          this.renderSelectedImage()
        }
        <Row>
          <Col md={12} >
            <button
              className="btn btn-primary"
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </button>
            <button
              className="btn btn-primary"
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

function mapStateToProps({ form: { newAdForm } }) {
  return {
    newAdForm,
  };
}

NewAdForm = connect(mapStateToProps)(NewAdForm); //eslint-disable-line

export default reduxForm({
  form: 'newAdForm', // a unique identifier for this form
})(NewAdForm);
