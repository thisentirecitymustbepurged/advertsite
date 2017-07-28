import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';

import db from '../../../firebase/db';

import {
  fetchAdsSuccess,
  fetchAdsFailure,
} from '../../../redux/readWrite/actionCreators';

class Home extends Component {
  constructor() {
    super();
    this.fetchAds();
  }

  fetchAds() {
    db.dbRef('/ads').once('value').then(
      snapshot => this.props.fetchAdsSuccess(snapshot.val()),
      () => this.props.fetchAdsFailure(),
    );
  }

  renderAds() {
    if (this.props.ads !== null) {
      const ads = this.props.ads;
      return Object.keys(ads).map(key => (
        <Col key={key} sm={6} md={3}>
          {ads[key].name}
          <Thumbnail href="#" alt="171x180" />
        </Col>
      ));
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdsSuccess,
    fetchAdsFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    ads: state.ads,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
