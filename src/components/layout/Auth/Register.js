import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, IconButton, Input, InputLabel, InputAdornment, FormControl, FormHelperText } from '@material-ui/core/'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch'
    }
  },
  textField: {
    width: '35ch',
    marginBottom: '2rem'
  }
}))

function Register (props) {
  const classes = useStyles()
  const history = useHistory()

  const { isRegistered } = props.User

  useEffect(() => {
    if (isRegistered) {
      history.push('/auth')
      props.User.clearStore()
    }
  }, [isRegistered])

  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.User.regUser(email, password, name, mobile)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <div className='container'>
      <div className='flex-jcc fw'>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className='mb2r flex-jcc'>
            <h2 className=''>
              Register
            </h2>
          </div>
          <div className={classes.margin}>
            <FormControl>
              <TextField
                label="Name"
                className={clsx(classes.margin, classes.textField)}
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Mobile"
                className={clsx(classes.margin, classes.textField)}
                name='mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={50}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Email"
                type='email'
                className={clsx(classes.margin, classes.textField)}
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={100}
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="my-helper-text">Your password will be secure saved</FormHelperText>
            </FormControl>
          </div>
          <div className='flex-jcc'>
            <Button type='submit' variant="contained" color="primary" className='mb2r'>
              Sign Up
            </Button>
          </div>
          <div className='flex-jcc mb2r'>
            <span>Already have an account?</span>&ensp;<Link to='/auth'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(Register))
