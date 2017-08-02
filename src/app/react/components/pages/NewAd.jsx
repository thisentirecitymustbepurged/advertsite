import React, { Component } from 'react';

import NewAdForm from '../forms/NewAdForm';

import {Grid, Row, Col,} from 'react-bootstrap';

import {
  createNewAd,
} from '../../../api';

export default class NewAd extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6} className="new_ad_form">
            <NewAdForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}
