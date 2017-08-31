import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

const selector = formValueSelector('adForm');

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
  constructor(props) {
    super(props);
    this.state = {
      imageUrlList: [],
    };
    this.imagesChanged = false;
  }

  componentDidMount() {
    if (this.props.initializeFromState) {
      const {
        images,
        ...initialValues
      } = this.props.initialValues;
      this.props.initialize(initialValues);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedImages !== prevProps.selectedImages) {
      this.imagesChanged = true;
      this.imgToDataUrl();
    }
  }

  imgToDataUrl() {
    let i = 0;
    const temp = [];
    const images = this.props.selectedImages;

    const pushUrlToTemp = () => {
      //eslint-disable-next-line
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        temp.push(result);

        if (images[i + 1]) {
          i += 1;
          pushUrlToTemp();
        } else {
          this.setState({ imageUrlList: temp });
        }
      };

      reader.readAsDataURL(images[i]);
    };

    pushUrlToTemp();
  }

  renderSelectedImages() {
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
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    console.log(this.props.selectedImages);
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

function mapStateToProps(state) {
  return {
    selectedImages: selector(state, 'images'),
    initialValues: state.ad.data
  };
}

AdForm = connect(mapStateToProps)(AdForm); //eslint-disable-line

export default reduxForm({
  form: 'adForm',
})(AdForm);
