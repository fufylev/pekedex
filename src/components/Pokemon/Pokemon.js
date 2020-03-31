import './Pokemon.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'
import { COLORS } from '../../utils/COLORS'
// import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { inject, observer } from 'mobx-react'

function Pokemon (props) {
  const { pokemon } = props
  const { userID, isLoggedIn } = props.User

  const toggleBookmark = () => {
    props.Store.togglePokemonBookmark({ pokemonID: pokemon.id, userID })
  }

  return (
    <div className='smallcard smallcard__link flex-v'>
      <div className='smallcard__header flex-jcc'>
        <h3>#{pokemon.id} &emsp; {pokemon.name.toUpperCase()}</h3> &emsp;
        {isLoggedIn && <FavoriteBorderIcon className='smallcard__like' onClick={toggleBookmark}/>}
      </div>
      <Link to={`/pokemons/${pokemon.id}-${pokemon.name}`} className=''>
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
      </Link>
    </div>
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.object,
  User: PropTypes.object,
  Store: PropTypes.object
}

export default inject('User', 'Store')(observer(Pokemon))
