import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <form role="form" onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label htmlFor="txtEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <button type="submit" className="btn btn-default btn-block">Reset Password</button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
