import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

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

  const { itemsToShow } = props

  const numberOfPagesToPaginate = Math.ceil(964 / itemsToShow)

  const handleChange = (event, value) => {
    setPage(value)
    props.setCurrentPage(value)
  }

  return (
    <div className={classes.root}>
      <Pagination count={numberOfPagesToPaginate} page={page} onChange={handleChange}/>
    </div>
  )
}

PaginationControlled.propTypes = {
  itemsToShow: PropTypes.number,
  setCurrentPage: PropTypes.func
}

export default PaginationControlled
