import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createNewAd,
  loginWithProvider,
  userAdsListener,
  deleteAd,
} from '../../../api';

class User extends Component {
  constructor(props) {
    super(props);
    this.userAdsRef = '';
    this.userAdsListenerWasCalled = false;
    this.createNewAd = this.createNewAd.bind(this);
    this.deleteAd = this.deleteAd.bind(this);
  }

  componentDidMount() {
    this.userAdsListener();
  }

  componentDidUpdate() {
    this.userAdsListener();
  }

  componentWillUnmount() {
    this.userAdsRef === '' ? '':this.userAdsRef.off();
  }

  userAdsListener() {
    if (
    this.props.user
    && this.props.user.uid !== undefined
    && !this.userAdsListenerWasCalled
    ) {
      this.userAdsListenerWasCalled = true;
      this.userAdsRef = userAdsListener(this.props.user.uid);
    }
  }

  createNewAd(values) {
    !values.title ? values.title = 'Amazing Title':'';
    !values.address ? values.address = 'Meme St. 32, London':'';
    !values.phone ? values.phone = '01123581321':'';
    !values.price ? values.price = '42£':'';
    !values.desc ? values.desc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, dolores delectus voluptates impedit assumenda, adipisci hic commodi excepturi ipsam soluta pariatur dolorum magni odio nihil. Hic nemo, omnis voluptas nihil, aspernatur reiciendis. Ullam nemo itaque accusantium voluptatum fugiat sequi dolorem at dolorum, omnis eligendi earum, accusamus aut sed praesentium dolores?':'';
    createNewAd(values, this.props.user.uid);
  }

  deleteAd(key) {
    deleteAd(this.props.user.uid, key);
  }

  renderAds() {
    if (this.props.userAds) {
      const ads = this.props.userAds;
      return Object.keys(ads).map(key => (
        <div key={key}>
          {ads[key].title}
          <button onClick={() => this.deleteAd(key)}>Delete</button>
          <button onClick={() => this.updateAd(key)}>Update</button>
        </div>
      ));
    }
  }

  render() {
    return (
      <div>
        {this.renderAds()}
      </div>
    );
  }
}

function mapStateToProps({ user, userAds}) {
  return {
    user,
    userAds,
  };
}

export default connect(mapStateToProps)(User);
