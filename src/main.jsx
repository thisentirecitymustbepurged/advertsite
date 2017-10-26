import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'app/~core/config/store';
import router from 'app/~core/config/router';
import './assets/styles/styles.scss';

const Root = () => (
  <Provider store={store}>
    {router}
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
