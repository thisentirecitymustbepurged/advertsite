import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, Image, Pagination } from 'react-bootstrap';

import {
  fetchAds,
} from '../../../api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    fetchAds();
  }

  renderAds() {
    if (Object.keys(this.props.ads).length !== 0) {
      const ads = this.props.ads;
      return Object.keys(ads).map(key => {
        const imgUrl = ads[key].images
          ? ads[key].images[Object.keys(ads[key].images)[0]]
          : 'http://via.placeholder.com/500x500';
        return (
          <Col key={key} sm={12} md={4}>
            <Link to={`ad/${key}`}>
              <Image src={imgUrl} width="100%" thumbnail />
              <div>{ads[key].title}</div>
            </Link>
          </Col>
        );
      });
    }
    return <div>No Ads</div>;
  }

  render() {
    return (
      <Grid className="ads text-center">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={20}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Row >
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ ads }) {
  return {
    ads,
  };
}

export default connect(mapStateToProps)(Home);
