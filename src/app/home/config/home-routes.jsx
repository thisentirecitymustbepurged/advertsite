import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from 'app/home/containers';

export default (
  <IndexRoute component={Home} />
  // <Route path="/" component={App}>
  //   <IndexRoute component={HomeRoutes} />
  // </Route>
);
