import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'app/~core/config/router';
import Store from 'app/~core/config/store';
import './assets/styles/styles.scss';

const Root = () => <Provider store={Store}>{Router}</Provider>;

ReactDOM.render(<Root />, document.getElementById('root'));
