import './DashBoard.scss'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import PaginationControlled from '../../Pagination/PaginationControlled'
import { inject, observer } from 'mobx-react'
import ItemsPerPageBlock from '../../Pagination/ItemsPerPageBlock'
import Pokemon from '../../Pokemon/Pokemon'
import CircularProgress from '../../Loader/Loader'
import CheckBox from '../../Filter/CheckBox'
import Modal from '../../Modal/Modal'
import PokemonDetails from '../../Pokemon/PokemonDetails'
import Search from '../../Filter/Serach'

function DashBoard (props) {
  const { pokemonsFiltered } = props.Store

  useEffect(() => {
    props.Store.fetchData()
  }, [])

  return (
    <div className='dashboard'>
      <div className='container tools flex-v'>
        <div className='tools__pagination flex-jcsb'>
          <PaginationControlled/>
          <ItemsPerPageBlock/>
        </div>
        <div className='tools__pagination flex-jcc'>
          <CheckBox />
          <Search/>
        </div>
      </div>
      <main>
        <div className='container'>
          {pokemonsFiltered.length === 0
            ? <CircularProgress/> : (
              <div className='cards-container'>
                {pokemonsFiltered.map(pokemon =>
                  <Pokemon pokemon={pokemon} key={pokemon.name}/>
                )}
              </div>
            )}
        </div>
      </main>

      <Switch>
        <Route path="/pokemons/:id"><Modal><PokemonDetails/></Modal></Route>
      </Switch>
    </div>
  )
}

DashBoard.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(DashBoard))
