import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Navigation from './containers/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'

import Firebase from '../../firebase/firebase'
import { fetchFirebaseUser } from '../../redux/firebaseUserAuth/firebaseUserAuthActions'

class Layout extends Component {

  componentWillMount() {
    this.props.fetchFirebaseUser()
  }

  render() {
    return (
      <div>
        <div>{this.props.reduxState.currentFirebaseUser.displayName}</div>              
        <Route path="/" component={Navigation} />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />    
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    fetchFirebaseUser,
  }, dispatch);
}

function mapStateToProps(state) {  
  return { 
    reduxState: state
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));