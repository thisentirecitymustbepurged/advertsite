import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import db from '../../../firebase/db';

import {
  fetchAds,
} from '../../../api';

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  renderAds() {
    if (this.props.ads) {
      const ads = this.props.ads;
      return Object.keys(ads).map(key => {
        const imgUrl = ads[key].images[Object.keys(ads[key].images)[0]];
        return (
          <Col key={key} xs={6} sm={4} md={3} lg={2}>
            <Image src={imgUrl} width="100%" thumbnail />
            <div>{ads[key].name}</div>
          </Col>
        );
      });
    }
    return <div>No Ads</div>;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ ads }) {
  return {
    ads,
  };
}

export default connect(mapStateToProps)(Home);
