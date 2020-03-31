import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { google } from '../../utils/API'
import Button from '@material-ui/core/Button'
import googleIcon from '../../assets/img/search.svg'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function Google (props) {
  const responseGoogle = (response) => {
    console.log(response)
    // eslint-disable-next-line camelcase
    const { access_token } = response.tokenObj
    const { imageUrl, givenName, email, googleId } = response.profileObj
    props.User.authenticateWithGoogle({
      avatar: imageUrl,
      name: givenName,
      email,
      accessToken: access_token,
      userID: googleId
    })
  }

  return (
    <div>
      <GoogleLogin
        clientId={google}
        render={renderProps => (
          <Button
            variant="contained"
            className='mb2r reg-button reg-button-google'
            onClick={renderProps.onClick}
          >
            <img src={googleIcon} alt="google icon" style={{ width: 30 }}/> &emsp; Login with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
Google.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(Google))
