import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core/'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
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

function PasswordInput ({ value, onChange, onClick, onMouseDown, error, showPassword }) {
  const classes = useStyles()

  return (
    <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name='password'
        value={value}
        required
        onChange={onChange('password')}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

PasswordInput.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  error: PropTypes.bool,
  showPassword: PropTypes.bool,
  value: PropTypes.string
}

export default inject('User')(observer(PasswordInput))
