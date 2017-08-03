import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { fetchAd } from '../../../api';

class Ad extends Component {
  constructor() {
    super();
    this.state = {
      activeImageUrl: '',
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
    if (Object.keys(this.props.ad).length !== 0) {
      const ad = this.props.ad;
      const images = ad.images;
      const firstImageUrl = images[Object.keys(images)[0]];
      console.log(firstImageUrl)
      return (
        <Row>
          <Col className="ad_info_col" sm={12} md={6}>
            <h1>{ad.title}</h1>
            <Row>
              <Col md={4}>Description</Col>
              <Col md={8}>{ad.desc}</Col>
            </Row>
            <Row>
              <Col md={4}>Pricing</Col>
              <Col md={8}>{ad.price}</Col>
            </Row>
            <Row>
              <Col md={4}>Location</Col>
              <Col md={8}>{ad.address}</Col>
            </Row>
            <Row>
              <Col md={4}>Contact</Col>
              <Col md={8}>{ad.phone}</Col>
            </Row>
          </Col>
          <Col sm={12} md={6} className="ad_image_col">
            <Image
              className="active_image"
              src={this.state.activeImageUrl || firstImageUrl}
              width="100%"
            />
            <Row>
              {
                Object.keys(images).map(key => (
                  <Col key={key} sm={3} md={2}>
                    <Image
                      src={images[key]}
                      width="100%"
                      onClick={() => this.setState({ activeImageUrl: images[key] })}
                    />
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
