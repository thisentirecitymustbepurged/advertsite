import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  Grid, Row, Col,
  Image, Pagination,
  DropdownButton, MenuItem,
} from 'react-bootstrap';

import {
  fetchAds
} from '../../../api';

import { Creators as paginationCreators } from '../../../redux/pagination/actions';
import { Creators as filterCreators } from '../../../redux/filter/actions';

const {
  paginationSetActivePage,
  paginationSetEndReached
} = paginationCreators;

const {
  setAdsFilter
} = filterCreators;

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  paginationSelect(nextPage) {
    this.props.paginationSetActivePage(nextPage);
    fetchAds();
  }

  filterByCategory(equalTo) {
    const filter = {
      order: {
        by: 'child',
        value: 'category'
      },
      equalTo
    };
    this.props.paginationSetEndReached(false);
    this.props.setAdsFilter(filter);
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
    const {
      categoryFilter
    } = this.props.filter;
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
        <Row>
          <DropdownButton
            className="filter_category"
            title="Select Category"
            onSelect={this.filterByCategory.bind(this)}
            id="select_category_dropdown"
          >
            <MenuItem eventKey="flat">Flat</MenuItem>
            <MenuItem eventKey="house">House</MenuItem>
            <MenuItem eventKey="cottage">Cottage</MenuItem>
          </DropdownButton>
          { categoryFilter }
        </Row>
        <Row >
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    paginationSetActivePage,
    setAdsFilter,
    paginationSetEndReached
  }, dispatch);
}

function mapStateToProps({ ads, pagination, filter }) {
  return {
    ads,
    pagination,
    filter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
