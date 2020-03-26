import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

function PaginationControlled (props) {
  const classes = useStyles()
  const [page, setPage] = useState(1)

  const { itemsToShow } = props.Store

  const numberOfPagesToPaginate = Math.ceil(964 / itemsToShow)

  const handleChange = (event, value) => {
    setPage(value)
    props.Store.setPage(value)
  }

  return (
    <div className={classes.root}>
      <Pagination count={numberOfPagesToPaginate} page={page} onChange={handleChange} style={{ backgroundColor: '#fff' }}/>
    </div>
  )
}

PaginationControlled.propTypes = {
  Store: PropTypes.object
}

export default inject('Store')(observer(PaginationControlled))
