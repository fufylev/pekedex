import './Pagination.scss'

import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

function ItemsPerPageBlock (props) {
  const { itemsToShow } = props.Store

  return (
    <FormControl className='selected'>
      <InputLabel htmlFor="age-native-simple">Items per page</InputLabel>
      <Select
        native
        value={itemsToShow}
        onChange={(event => props.Store.setItemToShow(event.target.value))}
      >
        <option aria-label="" value=""/>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Select>
    </FormControl>
  )
}

ItemsPerPageBlock.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(ItemsPerPageBlock))
