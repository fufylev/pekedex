import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button } from '@material-ui/core/'
import { Link, useHistory } from 'react-router-dom'
import Validator from '../../../utils/Validator'
import Alert from '@material-ui/lab/Alert'
import CustomInput from './CustomInput'
import PasswordInput from './PasswordInput'

const useStyles = makeStyles(theme => ({
  root: { '& > *': { margin: theme.spacing(1), width: '35ch' } }
}))

function Register (props) {
  const classes = useStyles()
  const history = useHistory()

  const { isRegistered, error } = props.User

  useEffect(() => {
    if (isRegistered) {
      history.push('/auth')
      props.User.clearStore()
    }
  }, [isRegistered])

  const [values, setValues] = useState({
    email: '',
    mobile: '',
    name: '',
    password: '',
    showPassword: false,
    emailError: '',
    passwordError: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const validateForm = () => {
    const emailValidate = new Validator()
    emailValidate.validateForm({ key: 'email', value: values.email })

    const passwordValidate = new Validator()
    passwordValidate.validateForm({ key: 'password', value: values.password })

    setValues({
      ...values,
      emailError: values.email === '' ? 'Email is required' : emailValidate.error,
      passwordError: values.password === '' ? 'Password is required' : passwordValidate.error
    })

    return emailValidate.isValid && passwordValidate.isValid
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formIsValid = validateForm()
    if (formIsValid) {
      props.User.registerUser({ ...values })
    }
  }

  return (
    <div className='container'>
      <div className='flex-jcc fw'>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className='mb2r flex-jcc'>
            <h1 className=''>Register</h1>
          </div>
          <div >
            <CustomInput handleChange={handleChange} value={values.name} name='name' />
            <CustomInput handleChange={handleChange} value={values.mobile} name='mobile'/>
            <CustomInput handleChange={handleChange} value={values.email} name='email' error={values.emailError}/>
            {values.emailError && <Alert severity="error" className='form-error '>{values.emailError}</Alert>}
            <PasswordInput
              value={values.password}
              onChange={handleChange}
              error={values.passwordError !== ''}
              showPassword={values.showPassword}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            />
            {values.passwordError && <Alert severity="error" className='form-error '>{values.passwordError}</Alert>}
          </div>
          <div className='flex-jcc'>
            {error.length > 0 && <Alert severity="error" className='form-error '>{error}</Alert>}
          </div>
          <div className='flex-v'>
            <Button type='submit' variant="contained" color="primary" className='mb2r'>Sign Up</Button>
          </div>
          <div className='flex-jcc mb2r'>
            <span>Already have an account?</span>&ensp;<Link to='/auth'><strong>Sign In</strong></Link>
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
