import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { routes as HomeRoutes } from 'app/home';
import store from './store';
import App from '../containers/App';
import { Creators as coreActions } from '../actions';

const { fetchUserAttempt } = coreActions;
const fetchUser = store.dispatch.bind(null, fetchUserAttempt());

export default (
  <Router history={browserHistory}>
    <Route path="/" onEnter={fetchUser} component={App}>
      { HomeRoutes }
    </Route>
  </Router>
);
// export default (
//   <Router history={syncHistoryWithStore(browserHistory, store)}>
//     <Route path="/" component={App}>
//       <IndexRoute component={HomeRoutes} />
//       <Route path="ad/:key" component={AdvertRoutes} />
//       <Route path="user" component={UserProfileRoutes} />
//     </Route>
//   </Router>
// );
