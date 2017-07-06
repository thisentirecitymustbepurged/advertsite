import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './react/components//Layout'

ReactDOM.render((
  <BrowserRouter>
    <Layout /> 
  </BrowserRouter>
), document.getElementById('root'))