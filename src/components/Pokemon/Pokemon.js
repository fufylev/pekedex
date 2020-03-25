import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

function Pokemon (props) {
  const { pokemon } = props

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className='card'>
        <CardContent>
          <Typography className='' color="textSecondary" gutterBottom>
            {pokemon.name.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.object
}

export default Pokemon
