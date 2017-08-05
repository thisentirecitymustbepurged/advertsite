import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './react/components/App';
import Home from './react/components/pages/Home';
import User from './react/components/pages/User';
import About from './react/components/pages/About';
import Ad from './react/components/pages/Ad';
import NewAd from './react/components/pages/NewAd';
import Login from './react/components/pages/Login';

import { fetchUser, fetchUserAds } from './api';
import store from './redux/store';

import '../styles.scss';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={fetchUser} component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="user" onEnter={fetchUserAds} component={User} />
        <Route path="login" component={Login} />
        <Route path="ad/create" component={NewAd} />
        <Route path="ad/:adKey" component={Ad} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root')); //eslint-disable-line
