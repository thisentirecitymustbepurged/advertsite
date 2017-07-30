import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './react/components/App';
import Home from './react/components/pages/Home';
import User from './react/components/pages/User';
import About from './react/components/pages/Home';

import { fetchUser } from './api';
import store from './redux/store';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={fetchUser} component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="user" component={User} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))

//<Route path="ad/:adKey" component={Ad} />
