import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import DashBoard from './components/DashBoard/DashBoard'
import MainPage from './components/layout/MainPage/MainPage'
import Auth from './components/Authentication/Auth'
import Register from './components/Authentication/Register'
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
