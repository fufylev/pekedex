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
        <option value={9}>9</option>
        <option value={21}>21</option>
        <option value={48}>48</option>
      </Select>
    </FormControl>
  )
}

ItemsPerPageBlock.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(ItemsPerPageBlock))
