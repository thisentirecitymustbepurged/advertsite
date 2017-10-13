import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from 'app/~core/containers/App';
import Home from 'app/home';
// import { routes as UserProfileRoutes } from 'app/userprofile';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      { Home }
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
