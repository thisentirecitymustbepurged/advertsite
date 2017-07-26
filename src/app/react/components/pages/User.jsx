import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

import NewItemForm from '../forms/NewItemForm';

class User extends Component {
  constructor(props) {
    super(props);
    this.userItemsRef = '';
    this.userItemsListenerWasCalled = false;
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSubmit = this.handleSubmit;
  }

  componentDidUpdate() {
    this.userItemsListener();
  }

  componentWillUnmount() {
    this.userItemsRef.off();
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

  createNewItem(values) {
    const newItemKey = firebaseDb.getDbRef('/').child('ads').push().key;
    const updates = {};
    updates[`/ads/${newItemKey}`] = { ...values, uid: this.props.uid };
    updates[`/user_ads/${this.props.uid}/${newItemKey}`] = values;
    firebaseDb.getDbRef('/').update(updates).then(
      () => this.props.createUserItemSuccess(),
      () => this.props.createUserItemFailure(),
    );
  }

  deleteItem(key) {
    const updates = {};
    updates[`/ads/${key}`] = null;
    updates[`/user_ads/${this.props.uid}/${key}`] = null;
    firebaseDb.getDbRef('/').update(updates).then(
      () => this.props.deleteUserItemSuccess(),
      () => this.props.deleteUserItemFailure(),
    );
  }

  userExists() {
    if (this.props.uid !== undefined) {
      return (
        <div>
          <div>Submit new item:</div>
          <NewItemForm onSubmit={this.createNewItem} />
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
          {items[key].name}, {items[key].a}, {items[key].b}
          <button onClick={() => this.deleteItem(key)}>Delete</button>
          <button onClick={() => this.updateItem(key)}>Update</button>
        </div>
        ),
      );
    }
    return <div>No items</div>;
  }

  handleSubmit(e) {
    console.log(e)
    const newItemKey = firebaseDb.dbRef('/').child('ads').push().key;
    console.log(newItemKey);
    firebaseStor.storRef().child(`images/${newItemKey}`).put(e.files[0]).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  render() {
    return (
      <div>
        {this.userExists()}
        {this.renderItems()}
        <input
          name="file"
          type="file"
          onChange={() => this.handleSubmit(this.myDiv)}
          ref={el => this.myDiv = el}
        />
      </div>
    );
  }
}

User.propTypes = {
  // userItems: PropTypes.shape({}),
  // loginWithFacebook: PropTypes.func,
  // uid: PropTypes.string,
  // fetchUserItemsSuccess: PropTypes.func,
  // fetchUserItemsFailure: PropTypes.func,
  // createUserItemSuccess: PropTypes.func,
  // createUserItemFailure: PropTypes.func,
  // // updateUserItemSuccess: PropTypes.func,
  // // updateUserItemFailure: PropTypes.func,
  // deleteUserItemSuccess: PropTypes.func,
  // deleteUserItemFailure: PropTypes.func,
};

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
