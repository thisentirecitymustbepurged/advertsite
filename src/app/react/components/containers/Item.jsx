import React, { Component } from 'react';


export default class Ad extends Component {
  constructor() {
    super();
    this.state = {
      showAdForm: 'something',
    };
  }

  render() {
    return (
      <div key={this.props.key}>
        {Ads[key].name}, {Ads[key].a}, {Ads[key].b}
        <button onClick={() => this.deleteAd(key)}>Delete</button>
        <button onClick={() => this.updateAd(key)}>Update</button>
      </div>
    );
  }
}
