import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { fetchAd, updateAd } from '../../api';
import AdForm from '../components/forms/AdForm';

class Ad extends Component {
  constructor() {
    super();
    this.state = {
      activeImageUrl: null,
      showUpdateForm: false,
    };
    this.firstImageWasRendered = false;
  }

  componentDidMount() {
    this.fetchAd();
  }

  fetchAd() {
    if (Object.keys(this.props.user).length) {
      return fetchAd(this.props.params.adKey, this.props.user.uid);
    }
    return fetchAd(this.props.params.adKey);
  }

  toggleUpdateForm() {
    return this.setState({ showUpdateForm: !this.state.showUpdateForm });
  }

  updateAd(values) {
    const uid = this.props.user.uid;
    const adKey = this.props.params.adKey;
    updateAd(
      values,
      uid,
      adKey,
    );
  }

  renderAd() {
    const {
      ad: {
        isOwner
      },
      data: {
        agency_name,
        agency_address,
        agency_phone,
        agency_other,
        agent_name,
        contractor_name,
        contractor_phone,
        contractor_email,
        contractor_linkedin,
        contractor_other,
        reason,
        amount,
        images
      },
    } = this.props;
    if (Object.keys(this.props.data).length !== 0) {
      const firstImageUrl = images
        ? images[Object.keys(images)[0]]
        : 'https://via.placeholder.com/500x500';
      const activeImgStyle = {
        backgroundImage: `url(${this.state.activeImageUrl || firstImageUrl})`,
        backgroundSize: 'cover',
      };
      return (
        <Row>
          {
            this.state.showUpdateForm
              ? <Col sm={12} md={6} className="ad_form">
                <h1>
                  Update Contract Details
                  <Button
                    className="toggle_update_form"
                    onClick={this.toggleUpdateForm.bind(this)}>
                    Cancel
                  </Button>
                </h1>
                <AdForm
                  initializeFromState
                  onSubmit={this.updateAd.bind(this)}
                />
              </Col>
              :
              <Col className="ad_info_col" sm={12} md={6}>
                <div className="details">
                  <h1>
                    Agency Details
                    {
                      isOwner &&
                      <Button
                        className="toggle_update_form"
                        onClick={this.toggleUpdateForm.bind(this)}>
                        Edit Contract Details
                      </Button>
                    }
                  </h1>
                  <Row>
                    <Col md={5}>Name</Col>
                    <Col md={7}>{agency_name}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Address</Col>
                    <Col md={7}>{agency_address}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Agent</Col>
                    <Col md={7}>{agent_name}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Phone</Col>
                    <Col md={7}>{agency_phone}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Reason for not paying</Col>
                    <Col md={7}>{reason}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Unpaid amount</Col>
                    <Col md={7}>{amount}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Additional</Col>
                    <Col md={7}>{agency_other}</Col>
                  </Row>
                </div>
                <div className="details">
                  <h1>
                    Contractor Details
                  </h1>
                  <Row>
                    <Col md={5}>Name</Col>
                    <Col md={7}>{contractor_name}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Linkedin Profile</Col>
                    <Col md={7}><a>{contractor_linkedin}</a></Col>
                  </Row>
                  <Row>
                    <Col md={5}>Email</Col>
                    <Col md={7}>{contractor_email}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Phone</Col>
                    <Col md={7}>{contractor_phone}</Col>
                  </Row>
                  <Row>
                    <Col md={5}>Additional</Col>
                    <Col md={7}>{contractor_other}</Col>
                  </Row>
                </div>
              </Col>
          }
          <Col sm={12} md={6} className="ad_image_col">
            <div
              className="active_image"
              style={activeImgStyle}>
            </div>
            <Row className="image_slider">
              {
                images && Object.keys(images).map(key => (
                  <Col key={key} sm={3} md={2}>
                    <div
                      className="slider_image"
                      role="button"
                      style={{
                        backgroundImage: `url(${images[key]})`,
                        backgroundSize: 'cover',
                      }}
                      onClick={() => this.setState({ activeImageUrl: images[key] })}>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      );
    }
  }

  render() {
    return (
      <Grid className="ad">
        {
          this.renderAd()
        }
      </Grid>
    );
  }
}

function mapStateToProps({ ad, ad: { data }, user }) {
  return {
    ad,
    data,
    user: user.data,
  };
}

export default connect(mapStateToProps)(Ad);
