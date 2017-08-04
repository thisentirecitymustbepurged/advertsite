import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Grid, Row, Col, Image, Button } from 'react-bootstrap';

import {
  fetchUserAds,
  deleteAd,
} from '../../../api';

class User extends Component {
  constructor() {
    super();
    this.deleteAd = this.deleteAd.bind(this);
    this.fetchUserAds = this.fetchUserAds.bind(this);
  }

  fetchUserAds() {
    if (
      this.props.user
      && this.props.user.uid !== undefined
    ) {
      fetchUserAds(this.props.user.uid);
    }
  }

  deleteAd(key) {
    deleteAd(this.props.user.uid, key);
  }

  renderAds() {
    if (Object.keys(this.props.userAds).length !== 0) {
      const ads = this.props.userAds;
      return Object.keys(ads).map(key => {
        const imgUrl = ads[key].images[Object.keys(ads[key].images)[0]];
        return (
          <Row>
            <Button onClick={this.fetchUserAds}>
              Fetch My Ads
            </Button>
            <Col key={key} sm={12} md={4}>
              <Link to={`ad/${key}`}>
                <Image src={imgUrl} width="100%" thumbnail />
                <div>{ads[key].title}</div>
              </Link>
            </Col>
          </Row>
        );
      });
    }
    return <Col md={12}>You have no ads.</Col>;
  }

  render() {
    return (
      <Grid className="user_profile">
        <Row className="user_ads">
          <Col sm={12} md={6}>
            {this.renderAds()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ user, userAds }) {
  return {
    user,
    userAds,
  };
}

export default connect(mapStateToProps)(User);
