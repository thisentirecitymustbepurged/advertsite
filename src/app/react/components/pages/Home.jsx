import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  Grid, Row, Col,
  Image, Pagination,
  // DropdownButton, MenuItem,
} from 'react-bootstrap';

import {
  fetchAds,
} from '../../../api';

import { Creators } from '../../../redux/pagination/actions';

const {
  paginationSetActivePage
} = Creators;

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  paginationSelect(eventKey) {
    this.props.paginationSetActivePage(eventKey);
    fetchAds();
  }

  renderAds() {
    const {
      activePage,
      itemsPerPage
    } = this.props.pagination;
    const ads = this.props.ads;
    const visibleAds = ads.filter((ad, index) => { //eslint-disable-line
      return index >= (activePage - 1) * itemsPerPage
        && index < activePage * itemsPerPage;
    });
    if (Object.keys(visibleAds).length !== 0) {
      return visibleAds.map(({ images, key, title }) => {
        const imgUrl = images
          ? images[Object.keys(images)[0]]
          : 'http://via.placeholder.com/500x500';
        return (
          <Col key={key} sm={12} md={4}>
            <Link to={`ad/${key}`}>
              <Image src={imgUrl} width="100%" thumbnail />
              <div>{title}</div>
            </Link>
          </Col>
        );
      });
    }
    return <div>No Ads</div>;
  }

  render() {
    const {
      activePage,
      pagesFetched
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
          items={pagesFetched}
          maxButtons={5}
          activePage={activePage}
          onSelect={this.paginationSelect.bind(this)}
        />
        <Row >
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    paginationSetActivePage
  }, dispatch);
}

function mapStateToProps({ ads, pagination }) {
  return {
    ads,
    pagination,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
