import './Auth.scss'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import CustomInput from './CustomInput'
import PasswordInput from './PasswordInput'
import Alert from '@material-ui/lab/Alert'
import FaceBook from './FaceBook'
import Google from './Google'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch'
    }
  }
}))

function Auth (props) {
  const classes = useStyles()
  const history = useHistory()
  const { isLoggedIn, error } = props.User

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn])

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.User.authenticate({ email: values.email, password: values.password })
    history.push('/')
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <div className='container'>
      <div className='flex-jcc fw'>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className='mb2r flex-jcc'>
            <h1 className=''>Login</h1>
          </div>
          <div className={classes.margin}>
            <CustomInput handleChange={handleChange} value={values.email} name='email'/>
            <PasswordInput
              value={values.password}
              onChange={handleChange}
              showPassword={values.showPassword}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            />
          </div>
          <div className='flex-jcc'>
            {error.length > 0 && <Alert severity="error" className='form-error '>{error}</Alert>}
          </div>
          <div className='flex-jcc mb2r'>
            <Button type='submit' variant="contained" color="primary" className='mb2r'>
              Sign In
            </Button>
          </div>
          <div className='flex-jcc mb2r'>
            <span>Do not have an account?</span>&ensp;<Link to='/register'><strong>Sign Up</strong></Link>
          </div>
          <div className='flex-jcc'>
            <FaceBook/>
          </div>
          <div className='flex-jcc'>
            <Google/>
          </div>
        </form>
      </div>
    </div>
  )
}

Auth.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(Auth))
