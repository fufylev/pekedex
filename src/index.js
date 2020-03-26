import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import Store from './store/index'
import App from './App'

const stores = {
  Store
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'))
