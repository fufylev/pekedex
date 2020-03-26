import './DashBoard.scss'

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PaginationControlled from '../../Pagination/PaginationControlled'
import { inject, observer } from 'mobx-react'
import ItemsPerPageBlock from '../../Pagination/ItemsPerPageBlock'
import Pokemon from '../../Pokemon/Pokemon'
import CircularProgress from '../../Loader/Loader'
import CheckBox from '../../Filter/CheckBox'
// import Button from '@material-ui/core/Button'
import { Input } from '@material-ui/core'

function DashBoard (props) {
  const { pokemonsFiltered } = props.Store

  useEffect(() => {
    props.Store.fetchData()
  }, [])

  return (
    <div className='custom-bgc'>
      <div className='container pagination-block'>
        <Grid container className='pagination-block flex-jcsb'>
          <Grid item>
            <PaginationControlled/>
          </Grid>
          <Grid item>
            <ItemsPerPageBlock/>
          </Grid>
        </Grid>
        <Grid container className='pagination-block flex-jcsb'>
          <Grid item xs={12} sm={12} md={10} className='flex-jcc'>
            <CheckBox />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Input
              value={props.Store.searchValue}
              color='primary'
              name='search'
              onChange={(e) => {
                props.Store.setSearchValue(e.target.value)
              }}
              placeholder='Search by name or id'
              className='search'
            />
          </Grid>
        </Grid>
      </div>
      <main>
        <div className='container'>
          {pokemonsFiltered.length === 0 ? <CircularProgress/> : (
            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {pokemonsFiltered && pokemonsFiltered.map(pokemon =>
                <Pokemon pokemon={pokemon} key={pokemon.name}/>
              )}
            </Grid>
          )}
        </div>

      </main>
    </div>
  )
}

DashBoard.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(DashBoard))
