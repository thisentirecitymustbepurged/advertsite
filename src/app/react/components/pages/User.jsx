import React, { Component } from 'react'

import firebaseDb from '../../../firebase/firebaseDb'

import NewItemForm from '../forms/newItemForm'

export default class User extends Component {

  constructor() {
    super();
    this.submitNewItem = values => {     
      const newItemKey = firebaseDb.getDbRef('/').child('items').push().key;
      const updates = {};
      updates['/items/' + newItemKey] = values;
      updates['/user-items/' + this.props.uid + '/'  + newItemKey] = '';
      firebaseDb.getDbRef('/').update(updates).then(
        () => console.log('success')
      );
    }
  }

  userExists() {   
    if (this.props.uid !== undefined) {
      return (
        <div>          
          <div>Submit new item:</div>
          <NewItemForm onSubmit={this.submitNewItem}/>
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

  render() {    
    return (
      <div>        
        {this.userExists()}      
      </div>
    );
  }
}