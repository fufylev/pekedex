import React from 'react'
import './ProgressBar.scss'
import PropTypes from 'prop-types'

/**
 * Styled custom progress bar
 * @param {string} name - nave of showing parameter
 * @param {string} value - value of showing parameter
 */
function ProgressBar ({ name, value }) {
  return (
    <div className='progress-bar'>
      <div className='progress-bar-scale' style={{ width: `${value}%` }}/>
      <div className='progress-bar-value'>
        {name} - {value} %
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string
}

export default ProgressBar
