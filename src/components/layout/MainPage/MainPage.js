import React from 'react'
import { Redirect } from 'react-router-dom'

const isLoggedIn = true

export function MainPage () {
  return (
    <div>
      {isLoggedIn ? <Redirect to='/pokemons'/> : <Redirect to='/auth'/>}
    </div>
  )
}
