import './DashBoard.scss'

import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../utils/helpers'
import PaginationControlled from '../../Pagination/PaginationControlled'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'

export function DashBoard () {
  const [page, setPage] = useState(1)
  const [itemsToShow, setItemsToShow] = useState(10)
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    try {
      axios.get(`${API_URL}pokemon/?offset=${page === 1 ? 0 : (page - 1) * itemsToShow}&limit=${itemsToShow}`)
        .then(response => {
          setPokemons(response.data.results)
        })
    } catch (e) {
      console.log(e)
    }
  }, [page, itemsToShow])

  const pageHandler = page => {
    setPage(page)
  }

  const itemPerPageHandler = event => {
    setItemsToShow(event.target.value)
  }

  return (
    <div className='container'>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <PaginationControlled setCurrentPage={pageHandler} itemsToShow={itemsToShow}/>
        </Grid>
        <Grid item justify='center'>
          <FormControl className='selected'>
            <InputLabel htmlFor="age-native-simple">Items per page</InputLabel>
            <Select
              native
              value={itemsToShow}
              onChange={itemPerPageHandler}
            >
              <option aria-label="" value=""/>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <main>
        <Grid container spacing={3}>
          {pokemons.map(pokemon =>
            <Grid item xs={12} sm={6} md={3} key={pokemon.name}>
              <Card className='card'>
                <CardContent>
                  <Typography className='' color="textSecondary" gutterBottom>
                    {pokemon.name.toUpperCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </main>
    </div>
  )
}
