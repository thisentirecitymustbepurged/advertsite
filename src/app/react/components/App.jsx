import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import firebaseAuth from '../../firebase/firebaseAuth'

import { 
  fetchFirebaseUserSuccess,
  fetchFirebaseUserFailure,
  logoutFirebaseUserSuccess,
  logoutFirebaseUserFailure,
  loginFirebaseUserSuccess,
  loginFirebaseUserFailure
} from '../../redux/firebaseUserAuth/firebaseUserAuthActionCreators'

import Navigation from './containers/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'

class App extends Component {
  constructor(props) {
    super(props);    
    this.fetchUser();
    this.firebaseLoginWithFacebook = this.firebaseLoginWithFacebook.bind(this);
    this.logoutFirebaseUser = this.logoutFirebaseUser.bind(this);
  }

  fetchUser() {
    firebaseAuth.fetchUser().then(      
      user => this.props.fetchFirebaseUserSuccess(user),      
      () => this.props.fetchFirebaseUserFailure()
    )
  }

  firebaseLoginWithFacebook() {
    firebaseAuth.loginWithProvider('facebook').then(
      result => this.props.loginFirebaseUserSuccess(result.user),
      () => this.props.loginFirebaseUserFailure()
    )
  }

  logoutFirebaseUser() {   
    firebaseAuth.logoutUser().then(
      () => this.props.logoutFirebaseUserSuccess(),
      () => this.props.logoutFirebaseUserFailure()
    )
  }

  renderComponent(Component) {
    switch (Component) {
      case Navigation:
        return () => {       
          if (this.props.reduxState.firebaseUser === null) {
            return <Component />
          } else {
            return <Component
              username={this.props.reduxState.firebaseUser.displayName}
              logOut={this.logoutFirebaseUser}
            />
          }
        };
      case User:
        return () => {
          if (this.props.reduxState.firebaseUser === null) {
            return <Component
              loginWithFacebook={this.firebaseLoginWithFacebook}
            />
          } else {
            return <Component
              uid = {this.props.reduxState.firebaseUser.uid}
            />
          }
        };
      default:
        throw new Error('Provided component name is not used.')
    }  
  }

  render() {
    return (
      <div>
        <Route path="/" render={this.renderComponent(Navigation)}/>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user" render={this.renderComponent(User)} /> 
      </div>
    );
  }  
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    fetchFirebaseUserSuccess,
    fetchFirebaseUserFailure,
    logoutFirebaseUserSuccess,
    logoutFirebaseUserFailure,
    loginFirebaseUserSuccess,
    loginFirebaseUserFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return { 
    reduxState: state
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));