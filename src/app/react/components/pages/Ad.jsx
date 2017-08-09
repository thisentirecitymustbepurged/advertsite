import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { fetchAd } from '../../../api';

class Ad extends Component {
  constructor() {
    super();
    this.state = {
      activeImageUrl: undefined,
    };
    this.firstImageWasRendered = false;
  }

  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    fetchAd(this.props.params.adKey);
  }

  renderAd() {
    const {
      ad,
      ad: {
        images,
        desc,
        price,
        address,
        phone,
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
        {this.renderAd()}
      </Grid>
    );
  }
}

function mapStateToProps({ ad }) {
  return {
    ad,
  };
}

export default connect(mapStateToProps)(Ad);
