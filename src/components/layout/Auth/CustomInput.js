import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core/'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch'
    }
  },
  textField: {
    width: '35ch',
    marginBottom: '1rem'
  }
}))

function CustomInput ({ handleChange, value, name, error = false }) {
  const classes = useStyles()

  return (
    <TextField
      label={name[0].toUpperCase() + name.slice(1)}
      className={clsx(classes.margin, classes.textField)}
      value={value}
      onChange={handleChange(name)}
      error={error}
    />
  )
}

CustomInput.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  length: PropTypes.string,
  error: PropTypes.string
}

export default CustomInput
