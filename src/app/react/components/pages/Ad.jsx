import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAd } from '../../../api'

import { Grid, Row, Col, Image} from 'react-bootstrap';

class Ad extends Component {
  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    fetchAd(this.props.params.adKey);
  }

  renderAd() {
    // const ad = this.props.ad;
    // return Object.getOwnPropertyNames(ad).map(key => {
    //   const imgUrl = ad[key].images[Object.keys(ads[key].images)[0]];
    //   return (
    //     <Row>
    //       <Col>
    //         <Image src={imgUrl} width="100%" thumbnail />
    //       </Col>
    //       <Col>

    //       </Col>
    //     </Row>
    //   );
    // });
  }

  render() {
    return (
      <Grid>
        {this.renderAd()}
      </Grid>
    );
  }
}

function mapStateToProps({ ad }) {
  return {
    ad,
  };
}

export default connect(mapStateToProps)(Ad);
