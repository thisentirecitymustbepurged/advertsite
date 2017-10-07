import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'app/~core/config';

const Root = () => <Provider>{ Router }</Provider>;

ReactDOM.render(<Root />, document.getElementById('root'));
