import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { fetchAd, updateAd } from '../../api';
import AdForm from '../components/forms/AdForm';

class Ad extends Component {
  constructor() {
    super();
    this.state = {
      activeImageUrl: null,
      showUpdateForm: false,
    };
    this.firstImageWasRendered = false;
  }

  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    if (Object.keys(this.props.user).length) {
      return fetchAd(this.props.params.adKey, this.props.user.uid);
    }
    return fetchAd(this.props.params.adKey);
  }

  toggleUpdateForm() {
    return this.setState({ showUpdateForm: !this.state.showUpdateForm });
  }

  updateAd(values) {
    const uid = this.props.user.uid;
    const adKey = this.props.params.adKey;
    updateAd(
      values,
      uid,
      adKey,
    );
  }

  renderAd() {
    const {
      ad: {
        isOwner
      },
      data: {
        title,
        category,
        images,
        desc,
        price,
        address,
        phone
      },
    } = this.props;
    if (Object.keys(this.props.data).length !== 0) {
      const firstImageUrl = images
        ? images[Object.keys(images)[0]]
        : 'https://via.placeholder.com/500x500';
      const activeImgStyle = {
        backgroundImage: `url(${this.state.activeImageUrl || firstImageUrl})`,
        backgroundSize: 'cover',
      };
      return (
        <Row>
          {
            this.state.showUpdateForm
              ? <Col sm={12} md={6} className="ad_form">
                <h1>
                  Update Ad
                  <Button
                    className="toggle_update_form"
                    onClick={this.toggleUpdateForm.bind(this)}>
                    Cancel
                  </Button>
                </h1>
                <AdForm
                  initializeFromState
                  onSubmit={this.updateAd.bind(this)}
                />
              </Col>
              :
              <Col className="ad_info_col" sm={12} md={6}>
                <h1>
                  {title}
                  {
                    isOwner &&
                    <Button
                      className="toggle_update_form"
                      onClick={this.toggleUpdateForm.bind(this)}>
                      Edit Ad
                    </Button>
                  }
                </h1>
                <Row>
                  <Col md={4}>Description</Col>
                  <Col md={8}>{desc}</Col>
                </Row>
                <Row>
                  <Col md={4}>Category</Col>
                  <Col md={8}>{category}</Col>
                </Row>
                <Row>
                  <Col md={4}>Pricing</Col>
                  <Col md={8}>{price}</Col>
                </Row>
                <Row>
                  <Col md={4}>Location</Col>
                  <Col md={8}>{address}</Col>
                </Row>
                <Row>
                  <Col md={4}>Contact</Col>
                  <Col md={8}>{phone}</Col>
                </Row>
              </Col>
          }
          <Col sm={12} md={6} className="ad_image_col">
            <div
              className="active_image"
              style={activeImgStyle}>
            </div>
            <Row className="image_slider">
              {
                images && Object.keys(images).map(key => (
                  <Col key={key} sm={3} md={2}>
                    <div
                      className="slider_image"
                      role="button"
                      style={{
                        backgroundImage: `url(${images[key]})`,
                        backgroundSize: 'cover',
                      }}
                      onClick={() => this.setState({ activeImageUrl: images[key] })}>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      );
    }
  }

  render() {
    return (
      <Grid className="ad">
        {
          this.props.user.uid && this.renderAd()
        }
      </Grid>
    );
  }
}

function mapStateToProps({ ad, ad: { data }, user }) {
  return {
    ad,
    data,
    user: user.data,
  };
}

export default connect(mapStateToProps)(Ad);
