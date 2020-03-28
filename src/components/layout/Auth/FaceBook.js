import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { facebookID } from '../../../utils/API'

export function FaceBook () {
  const responseFacebook = (response) => {
    console.log(response)
  }

  const componentClicked = () => {
  }

  return (
    <FacebookLogin
      appId={ facebookID }
      autoLoad={true}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook} />
  )
}
