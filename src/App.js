import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import DashBoard from './components/layout/DashBoard/DashBoard'
import MainPage from './components/layout/MainPage/MainPage'
import Auth from './components/layout/Auth/Auth'
import Register from './components/layout/Auth/Register'
// import HOC from './components/HOC/HOC'

function App () {
  return (
    <div>
      <Header/>
      <Switch>
        {/* <Route exact path='/' component={HOC(MainPage)}/> */}
        {/* <Route exact path='/pokemons' component={HOC(DashBoard)}/> */}
        <Route exact path="/"><MainPage/></Route>
        <Route path="/pokemons"><DashBoard/></Route>
        <Route path="/auth"><Auth/></Route>
        <Route path="/register"><Register/></Route>
      </Switch>
    </div>
  )
}

export default App
