import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { store, Router } from 'app/~core/config';

const Root = () => <Provider store={store}>{ Router }</Provider>;

ReactDOM.render(<Root />, document.getElementById('root'));
