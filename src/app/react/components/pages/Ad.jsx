import React, { Component } from 'react';
// import {  } '../../../api'

export default class Ad extends Component {
  render() {
    return (
      <div>{this.props.params.adKey}</div>
    );
  }
}
