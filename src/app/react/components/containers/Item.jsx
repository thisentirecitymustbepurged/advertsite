import React, { Component } from 'react';


export default class Item extends Component {
  constructor() {
    this.state = {
      showItemForm: 
    }
  }

  render() {
    return (
      <div key={this.props.key}>
        {items[key].name}, {items[key].a}, {items[key].b}
        <button onClick={() => this.deleteItem(key)}>Delete</button>
        <button onClick={() => this.updateItem(key)}>Update</button>
        
      </div>  
    );
  }
}