import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import auth from '../../firebase/auth';

import {
  fetchUserSuccess,
  fetchUserFailure,
  loginUserFailure,
  loginUserSuccess,
  logoutUserSuccess,
  logoutUserFailure,
} from '../../redux/userAuth/actionCreators';

import Navigation from './containers/Navigation';

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
          if (this.props.user === null) {
            return <Component />;
          }
          return (
            <Component
              user={this.props.user}
              logOut={this.logoutUser}
            />
          );
        };
      case User:
        return () => {
          if (this.props.user === null) {
            return (
              <Component
                loginWithFacebook={this.loginWithFacebook}
              />
            );
          }
          return (
            <Component
              uid={this.props.user.uid}
            />
          );
        };
      default:
        throw new Error('Provided component name is not used.');
    }
  }

  render() {
    return (
      <div className="app">
        <Navigation />
          { this.props.children }
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

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
