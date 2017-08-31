import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import 'bootstrap-social';
import App from './app/react/App';
import Home from './app/react/pages/Home';
import User from './app/react/pages/User';
import About from './app/react/pages/About';
import Ad from './app/react/pages/Ad';
import NewAd from './app/react/pages/NewAd';
import Login from './app/react/pages/Login';
import Register from './app/react/pages/Register';
import { fetchUser } from './app/api';
import store from './app/redux/store';
import './assets/styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={fetchUser} component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="user" component={User} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="ad/create" component={NewAd} />
        <Route path="ad/:adKey" component={Ad} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root')); //eslint-disable-line
