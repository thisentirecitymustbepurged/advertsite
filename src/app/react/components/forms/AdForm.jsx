import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Row, Col } from 'react-bootstrap';

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

class AdForm extends Component {
  constructor() {
    super();
    this.state = {
      imageUrlList: [],
    };
    this.imagesAreBeingHandled = false;
    this.imageUrlList = [];
  }

  componentDidMount() {
    this.props.initializeFromState //eslint-disable-line
      ? this.props.initialize(this.props.initialValues)
      : '';
  }

  handleImages() {
    const images = this.props.adForm.values.images;
    let i = 0;
    const handleImage = () => {
      const reader = new FileReader(); //eslint-disable-line
      reader.onload = e => {
        this.imageUrlList.push(e.target.result);
        if (images[i + 1]) {
          i += 1;
          handleImage();
        } else {
          this.setState({ imageUrlList: this.imageUrlList });
          this.imageUrlList = [];
          this.imagesAreBeingHandled = false;
        }
      };
      reader.readAsDataURL(images[i]);
    };
    handleImage();
  }

  renderSelectedImages() {
    if (
      this.props.adForm
      && this.props.adForm.values
      && this.props.adForm.values.images
      && Object.keys(this.props.adForm.values.images).length !== 0
    ) {
      if (this.state.imageUrlList.length > 0) {
        return (
          <Row className="selected_images_row">
            {
              this.state.imageUrlList.map((imgUrl, i) => (
                <Col key={i} sm={2} md={2} className="selected_image_cont">
                  <div
                    className="selected_image"
                    style={{
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: 'cover',
                    }}>
                  </div>
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

function mapStateToProps({ form: { adForm }, ad }) {
  return {
    initialValues: ad,
    adForm
  };
}

AdForm = connect(mapStateToProps)(AdForm); //eslint-disable-line

export default reduxForm({
  form: 'adForm', // a unique identifier for this form
})(AdForm);
