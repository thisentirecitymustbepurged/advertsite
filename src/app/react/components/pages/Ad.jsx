import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import { fetchAd, updateAd } from '../../../api';

import AdUpdateForm from '../forms/AdUpdateForm';

class Ad extends Component {
  constructor() {
    super();
    this.state = {
      activeImageUrl: undefined,
      showUpdateForm: false
    };
    this.firstImageWasRendered = false;
  }

  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    fetchAd(this.props.params.adKey, this.props.user.uid);
  }

  toggleUpdateForm() {
    this.setState({ showUpdateForm: !this.state.showUpdateForm });
  }

  updateAd() {

  }

  renderUpdateForm() {
    if (this.props.ad.isOwner && this.state.showUpdateForm) {
      return (
        <div>
          <Button
            className="toggle_update_form"
            onClick={this.toggleUpdateForm.bind(this)}>
            Edit Ad
          </Button>
          <AdUpdateForm onSumbit />
        </div>
      );
    }
    return (
      <Button
        className="toggle_update_form"
        onClick={this.toggleUpdateForm.bind(this)}>
        Edit Ad
      </Button>);
  }

  renderAd() {
    const {
      ad,
      ad: {
        images,
        desc,
        price,
        address,
        phone
      },
    } = this.props;
    if (Object.keys(this.props.ad).length !== 0) {
      const firstImageUrl = images
        ? images[Object.keys(images)[0]]
        : 'http://via.placeholder.com/500x500';
      const activeImgStyle = {
        backgroundImage: `url(${this.state.activeImageUrl || firstImageUrl})`,
        backgroundSize: 'cover',
      };
      return (
        <Row>
          <Col className="ad_info_col" sm={12} md={6}>
            <h1>{ad.title}</h1>
            <Row>
              <Col md={4}>Description</Col>
              <Col md={8}>{desc}</Col>
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
        <Row>
          <Col sm={12} md={6} className="new_ad_form">
            {this.renderUpdateForm()}
          </Col>
        </Row>
        {this.renderAd()}
      </Grid>
    );
  }
}

function mapStateToProps({ ad, user }) {
  return {
    ad,
    user,
  };
}

export default connect(mapStateToProps)(Ad);
