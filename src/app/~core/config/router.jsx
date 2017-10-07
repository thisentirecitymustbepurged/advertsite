import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from 'app/~core/containers/App';

import { routes as HomeRoutes } from 'app/home';
// import { routes as HomeRoutes } from 'app/home';
// import { routes as UserProfileRoutes } from 'app/userprofile';
console.log(HomeRoutes);

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
