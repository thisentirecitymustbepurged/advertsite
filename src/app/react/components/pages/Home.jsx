import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  Grid, Row, Col,
  Pagination,
  DropdownButton, MenuItem,
} from 'react-bootstrap';

import {
  fetchAds
} from '../../../api';

import { Creators as paginationActions } from '../../../redux/pagination/actions';
import { Creators as filterActions } from '../../../redux/filter/actions';

const {
  paginationSetItemsPerPage,
  paginationSetItemsPerPageOld,
  paginationSetActivePage,
  paginationSetEndReached,
  paginationSetPagesFetched
} = paginationActions;

const {
  setAdsFilter
} = filterActions;

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  paginationSelect(nextPage) {
    this.props.paginationSetActivePage(nextPage);
    fetchAds();
  }

  paginationSetItemsPerPage(itemsPerPageNew) {
    const {
      adsCount,
      itemsPerPage,
      activePage
    } = this.props.pagination;
    this.props.paginationSetPagesFetched(
      Math.ceil(adsCount / itemsPerPageNew)
    );
    this.props.paginationSetActivePage(
      Math.ceil(activePage * (itemsPerPage / itemsPerPageNew))
    );
    this.props.paginationSetItemsPerPage(itemsPerPageNew);
  }

  filterByCategory(equalToValue) {
    const filter = {
      order: {
        by: 'child',
        value: 'category'
      },
      equalTo: equalToValue
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
          : 'https://via.placeholder.com/500x500';
        const style = {
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
        };
        return (
          <Col
            key={key} sm={12} md={4} className="item_cont">
            <Link to={`ad/${key}`}>
              <div style={style} className="item_img_cont"></div>
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
      pagesFetched,
      itemsPerPage
    } = this.props.pagination;
    const title = this.props.filter.equalTo || 'Select Category';
    return (
      <Grid className="home_cont">
        <Row>
          <Col sm={12} md={2} className="category_filter_cont">
            <DropdownButton
              title={title}
              onSelect={this.filterByCategory.bind(this)}
              id="select_category_dropdown"
            >
              <MenuItem eventKey="1">Flat</MenuItem>
              <MenuItem eventKey="house">House</MenuItem>
              <MenuItem eventKey="cottage">Cottage</MenuItem>
            </DropdownButton>
          </Col>
          <Col sm={12} md={2} className="paginationSetItemsPerPage">
            <DropdownButton
              title={itemsPerPage}
              onSelect={this.paginationSetItemsPerPage.bind(this)}
              id="select_category_dropdown"
            >
              <MenuItem eventKey="6">6</MenuItem>
              <MenuItem eventKey="12">12</MenuItem>
              <MenuItem eventKey="18">18</MenuItem>
            </DropdownButton>
          </Col>
          <Col sm={12} md={6} className="pagination_cont">
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
          </Col>
          <Col sm={12} md={2}>
          </Col>
        </Row>
        <Row className="ads_cont">
          {this.renderAds()}
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    paginationSetItemsPerPage,
    paginationSetItemsPerPageOld,
    paginationSetActivePage,
    setAdsFilter,
    paginationSetEndReached,
    paginationSetPagesFetched
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
