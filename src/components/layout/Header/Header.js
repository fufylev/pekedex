import React, { useState } from 'react'
import './Header.scss'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import icon from '../../../assets/img/icon.png'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function Header (props) {
  const [showMenu, handleShowMenu] = useState(false)

  const { isLoggedIn, name } = props.User

  const logInHandler = () => {
    handleShowMenu(false)
  }

  const logOutHandler = () => {
    props.User.logout()
    handleShowMenu(false)
  }

  return (
    <header>
      <div className='container header flex-jcsb'>
        <Link to='/' style={{ margin: 0, padding: 0 }}>
          <div className='flex-jcc'>
            <img src={icon} alt="icon" style={{ width: 38 }}/><span className='header__brand'>Pokedex</span>
          </div>
        </Link>
        <div style={{ color: 'white' }}>
          {isLoggedIn && <strong>Hello {name}</strong>}
        </div>
        <div className='header__menu'>
          <Button onClick={() => handleShowMenu(!showMenu)}>
            {!isLoggedIn && <AccountCircleIcon fontSize='large' className='header-icon'/>}
            {isLoggedIn && <HowToRegIcon fontSize='large' className='header-icon'/>}
          </Button>
          {showMenu && (
            <div className='header__popup'>
              <ul className='header__list'>
                {!isLoggedIn && (
                  <li className='header__list__item'>
                    <Link to='/auth' className='flex-l' onClick={logInHandler}>
                      Login
                    </Link>
                  </li>
                )}
                {!isLoggedIn && (
                  <li>
                    <Link to='/register' className='flex-l' onClick={logInHandler}>
                      Register
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <span onClick={logOutHandler} className="header__link flex-l">
                      Logout &ensp;<ExitToAppIcon/>
                    </span>
                  </li>)}
                <li>

                </li>
              </ul>
            </div>
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
