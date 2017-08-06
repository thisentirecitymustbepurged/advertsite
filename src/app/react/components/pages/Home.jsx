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
    const {
      itemsPerPage,
      activePage,
      adsCount,
    } = this.props.pagination;
    return (
      <Grid className="ads text-center">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={Math.ceil(adsCount / itemsPerPage)}
          maxButtons={5}
          activePage={activePage}
          onSelect={() => ''}
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
