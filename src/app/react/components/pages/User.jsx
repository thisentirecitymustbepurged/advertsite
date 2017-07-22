import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'

import firebaseDb from '../../../firebase/firebaseDb'

import {
  fetchFirebaseUserItemsSuccess,
  fetchFirebaseUserItemsFailure,
  createFirebaseUserItemSuccess,
  createFirebaseUserItemFailure,
  // updateFirebaseUserItemSuccess,
  // updateFirebaseUserItemFailure,
  deleteFirebaseUserItemSuccess,
  deleteFirebaseUserItemFailure,
} from '../../../redux/firebaseReadWrite/firebaseReadWriteActionCreators'

import NewItemForm from '../forms/NewItemForm'

class User extends Component {
  constructor(props) {
    super(props);
    this.userItemsRef = '';
    this.firebaseUserItemsListenerWasCalled = false;
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.firebaseUserItemsListener()
  }

  componentWillUnmount() {
    this.userItemsRef.off();
  }

  firebaseUserItemsListener() {
    if (this.props.uid !== undefined && !this.firebaseUserItemsListenerWasCalled) {
      this.firebaseUserItemsListenerWasCalled = true;
      this.userItemsRef = firebaseDb.getDbRef('/user-items/' + this.props.uid);
      this.userItemsRef.on('value', 
        snapshot => this.props.fetchFirebaseUserItemsSuccess(snapshot.val()),
        () => this.props.fetchFirebaseUserItemsFailure()
      );
    }      
  } 

  createNewItem(values) {    
    const newItemKey = firebaseDb.getDbRef('/').child('items').push().key;
    const updates = {};
    updates['/items/' + newItemKey] = {...values, uid: this.props.uid};
    updates['/user-items/' + this.props.uid + '/'  + newItemKey] = values;
    firebaseDb.getDbRef('/').update(updates).then(
      () => this.props.createFirebaseUserItemSuccess(),
      () => this.props.createFirebaseUserItemFailure()
    );
  }

  deleteItem(key) {
    const updates = {};
    updates['/items/' + key] = null;
    updates['/user-items/' + this.props.uid + '/'  + key] = null;
    firebaseDb.getDbRef('/').update(updates).then(
      () => this.props.deleteFirebaseUserItemSuccess(),
      () => this.props.deleteFirebaseUserItemFailure()
    );
  }

  updateItem(key) {
    const updates = {};
    updates['/items/' + key] = null;
    updates['/user-items/' + this.props.uid + '/'  + key] = null;
    firebaseDb.getDbRef('/').update(updates).then(
      () => this.props.updateFirebaseUserItemSuccess(),
      () => this.props.updateFirebaseUserItemFailure()
    );
  }

  userExists() {   
    if (this.props.uid !== undefined) {       
      return (        
        <div>          
          <div>Submit new item:</div>
          <NewItemForm onSubmit={this.createNewItem}/>       
        </div>
      );
    } else {
      return (
        <div>
          <div>Please login:</div>
          <button onClick={this.props.loginWithFacebook}>Facebook</button>
        </div>
      ); 
    }
  }

  renderItems() {
    if (this.props.firebaseUserItems !== null) {
      const items = this.props.firebaseUserItems;
      return Object.keys(items).map(key => {
        return <div key={key}>{items[key].name}, {items[key].a}, {items[key].b}</div>
      })    
    } else {
      return <div>No items</div>;
    }
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
    fetchFirebaseUserItemsSuccess,
    fetchFirebaseUserItemsFailure,
    createFirebaseUserItemSuccess,
    createFirebaseUserItemFailure,
    deleteFirebaseUserItemSuccess,
    deleteFirebaseUserItemFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return { 
    firebaseUserItems: state.firebaseUserItems
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);