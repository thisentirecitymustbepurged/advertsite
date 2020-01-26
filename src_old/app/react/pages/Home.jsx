import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  Grid, Row, Col,
  Pagination,
  DropdownButton, MenuItem,
} from 'react-bootstrap';
import { fetchAds } from '../../api';
import { Creators as paginationActions } from '../../redux/pagination/actions';
import { Creators as filterActions } from '../../redux/filter/actions';
import { Creators as adsActions } from '../../redux/ads/actions';

const {
  paginationSetItemsPerPage,
  paginationSetActivePage,
  paginationSetEndReached,
  paginationSetPagesFetched
} = paginationActions;
const {
  setAdsFilter
} = filterActions;
const {
  setThereWasInitialFetch
} = adsActions;

class Home extends Component {
  componentDidMount() {
    fetchAds();
  }

  paginationSelect(nextPage) {
    const {
      activePage
    } = this.props.pagination;
    const oldActivePage = activePage;
    this.props.paginationSetActivePage(nextPage);
    oldActivePage < nextPage && fetchAds(); //eslint-disable-line
  }

  paginationSetItemsPerPage(itemsPerPageNew) {
    const {
      adsCount,
      itemsPerPage,
      activePage
    } = this.props.pagination;
    let newActivePage;

    const newPagesFetched = Math.ceil(adsCount / itemsPerPageNew);
    this.props.paginationSetPagesFetched(newPagesFetched);

    const oldFirstItemInActivePage = (itemsPerPage * (activePage - 1)) + 1;

    for (let i = 1; i <= newPagesFetched; i += 1) {
      if (i * itemsPerPageNew >= oldFirstItemInActivePage) {
        newActivePage = i;
        break;
      }
    }

    this.props.paginationSetActivePage(
      newActivePage < newPagesFetched
        ? newActivePage
        : newPagesFetched
    );

    this.props.paginationSetItemsPerPage(itemsPerPageNew);
    fetchAds();
  }

  filterByCategory(equalToValue) {
    const filter = {
      order: {
        by: 'child',
        value: 'category'
      },
      equalTo: equalToValue
    };
    this.props.paginationSetActivePage(1);
    this.props.paginationSetEndReached(false);
    this.props.setThereWasInitialFetch(false);
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
    const title = this.props.filter.equalTo;
    return (
      <Grid className="home_cont">
        <div className="category_filter_cont">
          <DropdownButton
            title={title ? `Category: ${title}` : 'Select Category'}
            onSelect={this.filterByCategory.bind(this)}
            id="select_category_dropdown"
          >
            <MenuItem eventKey="flat">Flat</MenuItem>
            <MenuItem eventKey="house">House</MenuItem>
            <MenuItem eventKey="cottage">Cottage</MenuItem>
          </DropdownButton>

          <DropdownButton
            title={`Items Per Page: ${itemsPerPage}`}
            onSelect={this.paginationSetItemsPerPage.bind(this)}
            id="select_category_dropdown"
          >
            <MenuItem eventKey="6">6</MenuItem>
            <MenuItem eventKey="12">12</MenuItem>
            <MenuItem eventKey="18">18</MenuItem>
          </DropdownButton>
        </div>
        <Row className="ads_cont">
          {this.renderAds()}
        </Row>
        <Row>
          <Col className="pagination_cont">
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
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    paginationSetItemsPerPage,
    paginationSetActivePage,
    paginationSetEndReached,
    paginationSetPagesFetched,
    setAdsFilter,
    setThereWasInitialFetch
  }, dispatch);
}

function mapStateToProps({ ads: { data }, pagination, filter }) {
  return {
    ads: data,
    pagination,
    filter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
