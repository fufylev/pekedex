import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function MainPage (props) {
  return (
    <div>
      {/* I left this page for further dev. Here can be Welcome page */}
      {<Redirect to='/pokemons'/>}
    </div>
  )
}

MainPage.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(MainPage))
