import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Store from './store/index'
import App from './App'

const stores = {
  Store
}

ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>,
  document.getElementById('root'))
