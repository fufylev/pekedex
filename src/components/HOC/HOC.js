import React from 'react'
import Auth from '../layout/Auth/Auth'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

function HOC (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount () {
      this._checkAndRedirect()
    }

    componentDidUpdate () {
      this._checkAndRedirect()
    }

    _checkAndRedirect () {
      // eslint-disable-next-line react/prop-types
      const { isLoggedIn } = this.props.User

      if (!isLoggedIn) {
        this.props.history.push('/auth')
      }
    }

    render () {
      return (
        <>
          {/* eslint-disable-next-line react/prop-types */}
          { this.props.User.isLoggedIn ? <ComposedComponent {...this.props} /> : <Auth/> }
        </>
      )
    }
    // const history = useHistory()
    // // eslint-disable-next-line react/prop-types
    // const { isLoggedIn } = props.User
    // const ComposedComponent = props.ComposedComponent
    //
    // useEffect(() => {
    //   _checkAndRedirect()
    // })
    //
    // const _checkAndRedirect = () => {
    //   if (!isLoggedIn) {
    //     history.push('/auth')
    //   }
    // }
    //
    // return (
    //   <div>
    //     { isLoggedIn ? <ComposedComponent {...props} /> : <Auth/> }
    //   </div>
    // )
  }

  Authenticate.propTypes = {
    User: PropTypes.object,
    history: PropTypes.func
  }

  return withRouter(inject('User')(observer(Authenticate)))
}

export default inject('User')(observer(HOC))
