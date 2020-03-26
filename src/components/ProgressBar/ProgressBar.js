import React from 'react'
import './ProgressBar.scss'
import PropTypes from 'prop-types'

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
