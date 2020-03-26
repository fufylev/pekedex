import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import DashBoard from './components/layout/DashBoard/DashBoard'
import { MainPage } from './components/layout/MainPage/MainPage'
import { Auth } from './components/layout/Auth/Auth'

function App () {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/"><MainPage/></Route>
        <Route path="/pokemons"><DashBoard/></Route>
        <Route path="/auth"><Auth/></Route>
      </Switch>
    </div>
  )
}

export default App
