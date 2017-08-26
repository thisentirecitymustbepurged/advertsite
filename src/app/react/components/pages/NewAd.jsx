import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import AdForm from '../forms/AdForm';

import {
  createNewAd,
} from '../../../api';

class NewAd extends Component {
  constructor() {
    super();
    this.createNewAd = this.createNewAd.bind(this);
  }

  createNewAd(values) {
    /* eslint-disable */
    !values.title ? values.title = 'Amazing Title' : '';
    !values.category ? values.category = 'flat' : '';
    !values.price ? values.price = '42£' : '';
    !values.address ? values.address = 'Meme St. 32, London' : '';
    !values.phone ? values.phone = '01123581321' : '';
    !values.desc ? values.desc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, dolores delectus voluptates impedit assumenda, adipisci hic commodi excepturi ipsam soluta pariatur dolorum magni odio nihil. Hic nemo, omnis voluptas nihil, aspernatur reiciendis. Ullam nemo itaque accusantium voluptatum fugiat sequi dolorem at dolorum, omnis eligendi earum, accusamus aut sed praesentium dolores?' : '';
    /* eslint-enable */
    createNewAd(values, this.props.user.uid);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6} className="ad_form">
            <h1>New Ad</h1>
            <AdForm onSubmit={this.createNewAd} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user: user.data,
  };
}

export default connect(mapStateToProps)(NewAd);
