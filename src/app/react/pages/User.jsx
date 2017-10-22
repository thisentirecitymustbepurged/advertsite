import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  deleteAd,
  userAdsListener,
  updatePassword,
} from '../../api';
import ChangePassword from '../components/forms/ChangePassword';

class User extends Component {
  constructor(props) {
    super(props);
    this.userAdsRef = null;
    this.userAdsListenerWasCalled = false;
    this.userAdsListener();
    this.deleteAd = this.deleteAd.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  componentDidUpdate() {
    this.userAdsListener();
  }

  componentWillUnmount() {
    this.userAdsRef ? this.userAdsRef.off() : ''; //eslint-disable-line
  }

  userAdsListener() {
    if (
      this.props.user
      && this.props.user.uid
      && !this.userAdsListenerWasCalled
    ) {
      this.userAdsListenerWasCalled = true;
      this.userAdsRef = userAdsListener(this.props.user.uid);
    }
  }

  updatePassword({ password }) {
    updatePassword(password);
  }

  deleteAd(key) {
    deleteAd(this.props.user.uid, key);
  }

  renderAds() {
    if (Object.keys(this.props.userAds).length !== 0) {
      const ads = this.props.userAds;
      return Object.keys(ads).map(key => {
        const imgUrl = ads[key].images
          ? ads[key].images[Object.keys(ads[key].images)[0]]
          : 'https://via.placeholder.com/500x500';
        const style = {
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
        };
        return (
          <Col
            key={key} sm={12} md={4} className="item_cont">
            <i role="button" className="fa fa-times" onClick={() => this.deleteAd(key)}></i>
            <Link to={`ad/${key}`}>
              <div style={style} className="item_img_cont"></div>
              <div>{ads[key].name}, {ads[key].amount}</div>
            </Link>
          </Col>
        );
      });
    }
    return <Col md={12}></Col>;
  }

  render() {
    return (
      <Grid className="user_profile">
        <Row className="user_ads">
          <Col sm={12} md={6} className="ads_col">
            <h1>Your Contracts</h1>
            <Row>
              {this.renderAds()}
            </Row>
          </Col>
          <Col sm={12} md={6}>
            <h1>Change Password</h1>
            <ChangePassword onSubmit={this.updatePassword} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ user, userAds }) {
  return {
    user: user.data,
    userAds,
  };
}

export default connect(mapStateToProps)(User);
