import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/helpers'
import CircularProgress from '../Loader/Loader'
import { COLORS } from '../../utils/COLORS'
import ProgressBar from '../ProgressBar/ProgressBar'

function PokemonDetails () {
  const [pokemon, setPokemon] = useState()
  const [pokemonSpecies, setPokemonSpecies] = useState()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${API_URL}pokemon/${id.split('-')[0]}`).then(response => setPokemon(response.data))
    axios.get(`${API_URL}pokemon-species/${id.split('-')[0]}`).then(response => setPokemonSpecies(response.data))
  }, [])

  return (
    <>
      {!pokemon ? <CircularProgress/> : (
        <div className='pokemon__details-view'>
          <div className='flex-v'>
            <h1>#{pokemon.id}&emsp;{pokemon.name.toUpperCase()}</h1>
          </div>
          <div className='flex-jcsb'>
            <div className='pokemon__general flex-v'>
              <img src={pokemon.sprites.front_default} alt={`${pokemon.name}`} className='pokemon-avatar'/>
              <div className='flex-jcc'>
                {pokemon.types.map((type, idx) => (
                  <div
                    className='pokemon-type'
                    style={{ background: COLORS[type.type.name] }}
                    key={idx}>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className='pokemon__desc'>
              <div className='pokemon__title'>
                {pokemonSpecies && pokemonSpecies.flavor_text_entries.filter(flavor => flavor.language.name === 'en')[0].flavor_text}
              </div>
              <div className='flex-jcsb'>
                <div className='pokemon__table'>
                  <p><strong>Gender: </strong>{pokemon.sprites.back_female === null ? 'Male' : 'Female'}</p>
                  <p><strong>Weight: </strong>{pokemon.weight / 10 } kg</p>
                  <p><strong>Height: </strong>{pokemon.height * 10} m</p>
                  <p><strong>Abilities: </strong>{pokemon.abilities[0].ability.name} & {pokemon.abilities[1].ability.name}</p>
                </div>
                <div>
                  <div className='flex-v'>
                    {pokemon.stats.map((stat, idx) => (
                      <div key={idx} className='flex-jcsb pokemon-stats'>
                        <ProgressBar name={stat.stat.name} value={stat.base_stat}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PokemonDetails
