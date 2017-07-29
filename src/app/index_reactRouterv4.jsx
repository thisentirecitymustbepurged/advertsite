import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router';

import App from './react/components/App';
import store from './redux/store';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" render={this.renderComponent(Navigation)} />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/user" render={this.renderComponent(User)} />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
