import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Navigation from './containers/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'

import { 
  fetchFirebaseUserSuccess,
  fetchFirebaseUserFailure,
  logoutFirebaseUserSuccess,
  logoutFirebaseUserFailure,
  loginFirebaseUserSuccess,
  loginFirebaseUserFailure
} from '../../redux/firebaseUserAuth/firebaseUserAuthActionCreators'

import firebaseUtils from '../../firebase/firebaseUtils'

class App extends Component {
  constructor(props) {
    super(props);    
    this.fetchUser();   
    this.firebaseLoginWithFacebook = this.firebaseLoginWithFacebook.bind(this);
    this.logoutFirebaseUser = this.logoutFirebaseUser.bind(this);    
    window.fetchUser = this.fetchUser.bind(this);
    window.reduxState = this.props.reduxState;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('omg an update')
  }

  fetchUser() {
    firebaseUtils.fetchUser().then(      
      user => this.props.fetchFirebaseUserSuccess(user),      
      () => this.props.fetchFirebaseUserFailure()
    )
  }

  firebaseLoginWithFacebook() {
    firebaseUtils.loginWithProvider('facebook').then(
      user => this.props.loginFirebaseUserSuccess(user),
      () => this.props.loginFirebaseUserFailure()
    )
  }
// ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooh, the object that login returns to the state is one level deeper than the one that fetch brings, hence there this misudnerstanding.
  logoutFirebaseUser() {   
    firebaseUtils.logoutUser().then(
      () => this.props.logoutFirebaseUserSuccess(),
      () => this.props.logoutFirebaseUserFailure()
    )
  }

  renderComponent(Component) {
    switch (Component) {
      case Navigation:
        return () => {       
          if (this.props.reduxState.currentFirebaseUser === null) {
            console.log('renderComponent-Navigation-if-true ')
            console.log(this.props.reduxState)
            return <Component />
          } else {
            console.log('renderComponent-Navigation-if-false ')
            console.log(this.props.reduxState)
            return <Component
              username={this.props.reduxState.currentFirebaseUser.displayName}
              logOut={this.logoutFirebaseUser}
            />
          }
        };
      case User:
        return () => {
          // console.log('user')
          if (this.props.reduxState.currentFirebaseUser === null) {
            console.log('renderComponent-User-if-true ')
            console.log(this.props.reduxState)    
            return <Component
              loginWithFacebook={this.firebaseLoginWithFacebook}
            />
          } else {
            console.log('renderComponent-User-if-false ')
            console.log(this.props.reduxState)
            return <Component
              username={this.props.reduxState.currentFirebaseUser.displayName}
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
        <div>{JSON.stringify(this.props.reduxState)}</div>  
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