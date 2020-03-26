import './Pokemon.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'
import { COLORS } from '../../utils/COLORS'

function Pokemon (props) {
  const { pokemon } = props

  return (
    <Link to={`/pokemons/${pokemon.id}-${pokemon.name}`} className='smallcard__link'>
      <div className='smallcard flex-v'>
        <div className='smallcard__header flex-jcc'>
          <h3>#{pokemon.id} &emsp; {pokemon.name.toUpperCase()}</h3>
        </div>
        <div className='smallcard__content flex-v'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className='smallcard__avatar'/>
          <div className='smallcard__pokemon flex-jcc'>
            {pokemon.types.map((type, idx) => (
              <div
                className='smallcard__pokemon-type'
                style={{ background: COLORS[type.type.name] }}
                key={idx}>
                {type.type.name}
              </div>
            ))}
          </div>
          <div className='flex-v'>
            {pokemon.stats.map((stat, idx) => (
              <div key={idx} className='flex-jcsb pokemon-stats'>
                <ProgressBar name={stat.stat.name} value={stat.base_stat}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.object
}

export default Pokemon
