import React from 'react'
import './Header.scss'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AppsIcon from '@material-ui/icons/Apps'
import { Link } from 'react-router-dom'
export default function Header () {
  return (
    <header className=''>
      <div className='container flex-jcc'>
        <Link to='/'>
          <AppsIcon fontSize='large' className='header-icon'/>
        </Link>
        <h2 className='header-text'>Pokedex UI</h2>
        <Link to='/auth'>
          <AccountCircleIcon fontSize='large' className='header-icon'/>
        </Link>
      </div>
    </header>
  )
}
