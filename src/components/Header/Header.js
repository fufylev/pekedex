import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import icon from '../../assets/img/icon.png'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function Header (props) {
  const { isLoggedIn, name, avatar } = props.User

  const logOutHandler = () => {
    props.User.logout()
  }

  return (
    <header>
      <div className='container header flex-jcsb'>
        <Link to='/' style={{ margin: 0, padding: 0 }}>
          <div className='flex-jcc'>
            <img src={icon} alt="icon" style={{ width: 38 }}/><span className='header__brand sm-xs-hidden'>Pokedex</span>
          </div>
        </Link>
        <div style={{ color: 'white' }}>
          {isLoggedIn && name !== undefined && <strong className='sm-xs-hidden'>Hello {name}</strong>}
        </div>
        <div className='header__menu flex-jcc'>
          {avatar && <img src={avatar} alt="avatar" style={{
            width: 38, borderRadius: '50%'
          }}/>}
          {isLoggedIn && (
            <span onClick={logOutHandler} className="header__link">
                      Log Out
            </span>
          )}
          {!isLoggedIn && (
            <Link to='/auth' className='flex-jcc'>
              <span className="header__link">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(Header))
