import React, { useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

export function CheckBox (props) {
  useEffect(() => {
    props.Store.setPokemonTypes()
  }, [])

  const pokemonTypes = { ...props.Store.pokemonTypes }

  const handleChange = event => {
    const type = event.target.name
    props.Store.tickPokemonTypes({ [type]: event.target.checked })
  }

  return (
    <div>
      <FormGroup row>
        {Object.keys(pokemonTypes).map(type => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={pokemonTypes[type]}
                onChange={handleChange}
                name={type}
                color="primary"
              />}
            label={type}
          />
        ))}
      </FormGroup>
    </div>
  )
}
CheckBox.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(CheckBox))
