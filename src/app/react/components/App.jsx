import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import auth from '../../firebase/auth';

import {
  fetchUserSuccess,
  fetchUserFailure,
  loginUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  loginUserSuccess,
} from '../../redux/userAuth/actionCreators';

import Navigation from './containers/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchUser();
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  fetchUser() {
    auth.fetchUser().then(
      user => this.props.fetchUserSuccess(user),
      () => this.props.fetchUserFailure(),
    )
  }

  loginWithFacebook() {
    auth.loginWithProvider('facebook').then(
      snapshot => this.props.loginUserSuccess(snapshot.user),
      () => this.props.loginUserFailure(),
    )
  }

  logoutUser() {
    return auth.logoutUser().then(
      () => this.props.logoutUserSuccess(),
      () => this.props.logoutUserFailure(),
    );
  }

  renderComponent(Component) {
    switch (Component) {
      case Navigation:
        return () => {
          if (this.props.reduxState.user === null) {
            return <Component />;
          }
          return (
            <Component
              user={this.props.reduxState.user}
              logOut={this.logoutUser}
            />
          );
        };
      case User:
        return () => {
          if (this.props.reduxState.user === null) {
            return (
              <Component
                loginWithFacebook={this.loginWithFacebook}
              />
            );
          }
          return (
            <Component
              uid={this.props.reduxState.user.uid}
            />
          );
        };
      default:
        throw new Error('Provided component name is not used.');
    }
  }

  render() {
    return (
      <div>
        <Route path="/" render={this.renderComponent(Navigation)} />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user" render={this.renderComponent(User)} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserSuccess,
    fetchUserFailure,
    logoutUserSuccess,
    logoutUserFailure,
    loginUserSuccess,
    loginUserFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
