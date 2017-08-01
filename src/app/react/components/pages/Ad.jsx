import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAd } from '../../../api'

import { Grid, Row, Col, Image} from 'react-bootstrap';

class Ad extends Component {
  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    fetchAd(this.props.params.adKey);
  }

  renderAd() {
    if (Object.keys(this.props.ad).length !== 0) {
      const ad = this.props.ad;
      const imgUrl = ad.images[Object.keys(ad.images)[0]];
      return (
        <Row>
          <Col className="info_col" sm={12} md={6}>
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
          <Col sm={12} md={6}>
            <Image src={imgUrl} width="100%" />
          </Col>
        </Row>
      );
    }
  }

  render() {
    return (
      <Grid>
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
