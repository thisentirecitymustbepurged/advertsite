import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';

import firebaseDb from '../../../firebase/firebaseDb';
// import firebaseStor from '../../../firebase/firebaseStor';

import {
  fetchItemsSuccess,
  fetchItemsFailure,
} from '../../../redux/readWrite/readWriteActionCreators';

class Home extends Component {
  constructor() {
    super();
    this.fetchItems();
  }

  fetchItems() {
    firebaseDb.dbRef('/ads').once('value').then(
      snapshot => this.props.fetchItemsSuccess(snapshot.val()),
      () => this.props.fetchItemsFailure(),
    );
  }

  renderItems() {
    if (this.props.items !== null) {
      const items = this.props.items;
      return Object.keys(items).map(key => (
        <Col key={key} sm={6} md={3}>
          {items[key].name}
          <Thumbnail href="#" alt="171x180" />
        </Col>
      ));
    }
    return <div>No items</div>;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {this.renderItems()}
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchItemsSuccess,
    fetchItemsFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
