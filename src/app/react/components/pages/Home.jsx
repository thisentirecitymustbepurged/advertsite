import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Grid, Row, Col,
  Image, Pagination,
  DropdownButton, MenuItem,
} from 'react-bootstrap';

import {
  fetchAds,
} from '../../../api';

class Home extends Component {
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
        <DropdownButton title="Dropdown">
          <MenuItem eventKey="1">Dropdown link</MenuItem>
          <MenuItem eventKey="2">Dropdown link</MenuItem>
        </DropdownButton>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={20}
          maxButtons={5}
          activePage={this.props.pagination.activePage}
          onSelect={this.handleSelect}
        />
        <Row >
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ ads, pagination }) {
  return {
    ads,
    pagination,
  };
}

export default connect(mapStateToProps)(Home);
