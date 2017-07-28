import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import firebaseDb from '../../../firebase/firebaseDb';
import firebaseStor from '../../../firebase/firebaseStor';

import {
  fetchUserItemsSuccess,
  fetchUserItemsFailure,
  createUserItemSuccess,
  createUserItemFailure,
  // updateUserItemSuccess,
  // updateUserItemFailure,
  deleteUserItemSuccess,
  deleteUserItemFailure,
} from '../../../redux/readWrite/readWriteActionCreators';

import createNewAd from '../api/createNewAd';

import NewItemForm from '../forms/NewItemForm';

class User extends Component {
  constructor(props) {
    super(props);
    this.userItemsRef = '';
    this.userItemsListenerWasCalled = false;
    this.userItemsListener();
    this.createNewAd = this.createNewAd.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidUpdate() {
    this.userItemsListener();
  }

  componentWillUnmount() {
    this.userItemsRef === '' ? '':this.userItemsRef.off();
  }

  userItemsListener() {
    if (this.props.uid !== undefined && !this.userItemsListenerWasCalled) {
      this.userItemsListenerWasCalled = true;
      this.userItemsRef = firebaseDb.dbRef(`/user_ads/${this.props.uid}`);
      this.userItemsRef.on('value',
        snapshot => this.props.fetchUserItemsSuccess(snapshot.val()),
        () => this.props.fetchUserItemsFailure(),
      );
    }
  }

  createNewAd(values) {
    createNewAd(values, this.props.uid).then(
      () => this.props.createUserItemSuccess(),
      () => this.props.createUserItemFailure(),
    )
  }

  deleteItem(key) {
    const updates = {};
    updates[`/ads/${key}`] = null;
    updates[`/user_ads/${this.props.uid}/${key}`] = null;
    firebaseDb.dbRef('/').update(updates).then(
      () => this.props.deleteUserItemSuccess(),
      () => this.props.deleteUserItemFailure(),
    );
  }

  userExists() {
    if (this.props.uid !== undefined) {
      return (
        <div>
          <div>Submit new item:</div>
          <NewItemForm onSubmit={this.createNewAd} />
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

  renderItems() {
    if (this.props.userItems !== null) {
      const items = this.props.userItems;
      return Object.keys(items).map(key => (
        <div key={key}>
          {items[key].name}
          <button onClick={() => this.deleteItem(key)}>Delete</button>
          <button onClick={() => this.updateItem(key)}>Update</button>
        </div>
      ));
    }
    return <div>No items</div>;
  }

  render() {
    return (
      <div>
        {this.userExists()}
        {this.renderItems()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserItemsSuccess,
    fetchUserItemsFailure,
    createUserItemSuccess,
    createUserItemFailure,
    deleteUserItemSuccess,
    deleteUserItemFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    userItems: state.userItems,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
