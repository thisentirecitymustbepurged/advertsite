import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import auth from '../../../firebase/auth';
import db from '../../../firebase/db';

import NewAdForm from '../forms/NewAdForm';

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

  componentDidUpdate() {
    this.userAdsListener();
  }

  componentDidMount() {
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
    !values.title ? values.title = 'title':'';
    !values.address ? values.address = 'address':'';
    !values.phone ? values.phone = '0000000000':'';
    !values.price ? values.price = '99999':'';
    !values.desc ? values.desc = 'description':'';
    createNewAd(values, this.props.user.uid);
  }

  deleteAd(key) {
    deleteAd(this.props.user.uid, key);
  }

  userExists() {
    if (this.props.user) {
      return (
        <div>
          <div>Submit new Ad:</div>
          <NewAdForm onSubmit={this.createNewAd} />
        </div>
      );
    }
    return (
      <div>
        <div>Please login:</div>
        <button onClick={() => loginWithProvider('facebook')}>Facebook</button>
      </div>
    );
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
        {this.userExists()}
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
