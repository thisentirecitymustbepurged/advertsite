import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import db from '../../../firebase/db';

import {
  fetchAds,
} from '../../../api';

import { Grid, Row, Col, Image } from 'react-bootstrap';

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  renderAds() {
    if (Object.keys(this.props.ads).length !== 0) {
      const ads = this.props.ads;
      return Object.keys(ads).map(key => {
        const imgUrl = ads[key].images[Object.keys(ads[key].images)[0]];
        return (
          <Col key={key} xs={6} sm={4} md={3} lg={2}>
            <Link to={`ad/${key}`}>
              <Image src={imgUrl} width="100%" thumbnail />
              <div>{ads[key].title}</div>
            </Link>
          </Col>
        );
      });
    }
    return <div>No Ads</div>;
  }

  render() {
    return (
      <Grid>
        <Row>
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
