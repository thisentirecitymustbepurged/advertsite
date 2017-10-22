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
          this.setState(prevState => ({
            imageUrlList: prevState.imageUrlList.concat(temp)
          }));
        }
      };

      if (images.length) reader.readAsDataURL(images[i]);
    };

    pushUrlToTemp();
  }

  removeSelectedImage(index) {
    const imageUrlList = this.state.imageUrlList;
    imageUrlList.splice(index, 1);
    this.setState({
      imageUrlList
    });
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
                  <i
                    role="button"
                    className="fa fa-times"
                    onClick={() => this.removeSelectedImage(i)}>
                  </i>
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
    const {
      agency_name,
      agency_address,
      agency_phone,
      agency_other,
      agent_name,
      contractor_name,
      contractor_phone,
      contractor_email,
      contractor_linkedin,
      contractor_other,
      reason,
      amount,
    } = {};
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>Agency name</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="agency_name"
              component="input"
              type="text"

            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Agency address</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="agency_address"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Agent name</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="agent_name"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Agency phone</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="agency_phone"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Reason for not paying</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="reason"
              component="textarea"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Unpaid amount</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="amount"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Agency additional information</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="agency_other"
              component="textarea"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Contractor name</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="contractor_name"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Contractor Linkedin profile</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="contractor_linkedin"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Contractor email</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="contractor_email"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Contractor phone</Col>
          <Col md={7}>
            <Field
              className="form-control"
              name="contractor_phone"
              component="input"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>Proving Documents</Col>
          <Col md={7}>
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
