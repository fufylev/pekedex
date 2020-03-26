import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Input } from '@material-ui/core'

export function Search (props) {
  return (
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
  )
}

Search.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(Search))
