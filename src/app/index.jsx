import { Provider } from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './react/components/Layout'
import store from './redux/store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Layout />      
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))