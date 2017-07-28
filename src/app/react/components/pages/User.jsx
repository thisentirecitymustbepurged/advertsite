import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import firebaseDb from '../../../firebase/firebaseDb';
import firebaseStor from '../../../firebase/firebaseStor';

import {
  fetchUserAdsSuccess,
  fetchUserAdsFailure,
  createUserAdSuccess,
  createUserAdFailure,
  // updateUserAdSuccess,
  // updateUserAdFailure,
  deleteUserAdSuccess,
  deleteUserAdFailure,
} from '../../../redux/readWrite/readWriteActionCreators';

import createNewAd from '../api/createNewAd';

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
      this.userAdsRef = firebaseDb.dbRef(`/user_ads/${this.props.uid}`);
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
    firebaseDb.dbRef('/').update(updates).then(
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
      const Ads = this.props.userAds;
      return Object.keys(Ads).map(key => (
        <div key={key}>
          {Ads[key].name}
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
