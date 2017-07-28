import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import db from '../../../firebase/db';

import {
  fetchUserAdsSuccess,
  fetchUserAdsFailure,
  createUserAdSuccess,
  createUserAdFailure,
  // updateUserAdSuccess,
  // updateUserAdFailure,
  deleteUserAdSuccess,
  deleteUserAdFailure,
} from '../../../redux/readWrite/actionCreators';

import { createNewAd } from '../../api';

import NewAdForm from '../forms/NewAdForm';

class User extends Component {
  constructor(props) {
    super(props);
    this.userAdsRef = '';
    this.userAdsListenerWasCalled = false;
    this.userAdsListener();
    this.createNewAd = this.createNewAd.bind(this);
    this.deleteAd = this.deleteAd.bind(this);
  }

  componentDidUpdate() {
    this.userAdsListener();
  }

  componentWillUnmount() {
    this.userAdsRef === '' ? '':this.userAdsRef.off();
  }

  userAdsListener() {
    if (this.props.uid !== undefined && !this.userAdsListenerWasCalled) {
      this.userAdsListenerWasCalled = true;
      this.userAdsRef = db.dbRef(`/user_ads/${this.props.uid}`);
      this.userAdsRef.on('value',
        snapshot => this.props.fetchUserAdsSuccess(snapshot.val()),
        () => this.props.fetchUserAdsFailure(),
      );
    }
  }

  createNewAd(values) {
    createNewAd(values, this.props.uid).then(
      () => this.props.createUserAdSuccess(),
      () => this.props.createUserAdFailure(),
    )
  }

  deleteAd(key) {
    const updates = {};
    updates[`/ads/${key}`] = null;
    updates[`/user_ads/${this.props.uid}/${key}`] = null;
    db.dbRef('/').update(updates).then(
      () => this.props.deleteUserAdSuccess(),
      () => this.props.deleteUserAdFailure(),
    );
  }

  userExists() {
    if (this.props.uid !== undefined) {
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
        <button onClick={this.props.loginWithFacebook}>Facebook</button>
      </div>
    );
  }

  renderAds() {
    if (this.props.userAds !== null) {
      const ads = this.props.userAds;
      return Object.keys(ads).map(key => (
        <div key={key}>
          {ads[key].name}
          <button onClick={() => this.deleteAd(key)}>Delete</button>
          <button onClick={() => this.updateAd(key)}>Update</button>
        </div>
      ));
    }
    return <div>No Ads</div>;
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserAdsSuccess,
    fetchUserAdsFailure,
    createUserAdSuccess,
    createUserAdFailure,
    deleteUserAdSuccess,
    deleteUserAdFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    userAds: state.userAds,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
