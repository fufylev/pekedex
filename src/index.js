import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './store/index'
import User from './store/user'
import App from './App'

const stores = {
  Store,
  User
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'))
