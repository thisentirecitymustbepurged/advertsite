import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Row, Col, Image } from 'react-bootstrap';

const adaptFileEventToValue = delegate => e => delegate(e.target.files);

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
    multiple
    {...inputProps}
    {...props}
  />
);

class NewAdForm extends Component {
  constructor() {
    super();
    this.state = {
      imageUrlList: [],
    };
    this.imagesAreBeingHandled = false;
    this.imageUrlList = [];
  }

  handleImages() {
    const images = this.props.newAdForm.values.images;
    let i = 0;
    const handleImage = () => {
      const reader = new FileReader(); //eslint-disable-line
      reader.onload = e => {
        this.imageUrlList.push(e.target.result);
        console.log(this.imageUrlList);
        if (images[i + 1]) {
          i += 1;
          handleImage();
        } else {
          this.imagesAreBeingHandled = false;
          this.setState({ imageUrlList: this.imageUrlList });
        }
      };
      reader.readAsDataURL(images[i]);
    };
    handleImage();
  }

  renderSelectedImages() {
    if (
      this.props.newAdForm
      && this.props.newAdForm.values
      && Object.keys(this.props.newAdForm.values.images).length !== 0
    ) {
      if (this.state.imageUrlList.length > 0) {
        console.log(this.state.imageUrlList);
        return (
          <Row>
            {
              this.state.imageUrlList.map((imgUrl, i) => (
                <Col key={i} sm={4} md={3} className="selected_images">
                  <Image src={imgUrl} width="100%" />
                </Col>
              ))
            }
          </Row>
        );
      }
    } else {
      return <div>You can select multiple images...</div>;
    }
    if (!this.imagesAreBeingHandled) {
      this.imagesAreBeingHandled = true;
      this.handleImages();
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
          <Col md={3}>Pictures</Col>
          <Col md={9}>
            <Field
              name="images"
              component={FileInput}
            />
          </Col>
        </Row>
        {
          this.renderSelectedImages()
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
