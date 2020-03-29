import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { facebookID } from '../../utils/API'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button'

function FaceBook (props) {
  const responseFacebook = (response) => {
    const { picture, name, email, accessToken, userID } = response
    const avatar = picture.data.url
    // console.log(response)
    props.User.authenticateWithAccount({ avatar, name, email, accessToken, userID })
  }

  return (
    <div>
      <FacebookLogin
        appId={ facebookID }
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          <Button
            variant="contained"
            color="primary"
            className='mb2r reg-button reg-button-facebook'
            onClick={renderProps.onClick}
          >
            <FacebookIcon fontSize='large'/>&ensp; Login with Facebook
          </Button>
        )}
      />
    </div>
  )
}

FaceBook.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(FaceBook))
