import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { routes as HomeRoutes } from 'app/home';
import App from '../containers/App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
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
