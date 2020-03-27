import './Modal.scss'

import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import CancelIcon from '@material-ui/icons/Cancel'

const modalRoot = document.getElementById('modal')

function Modal (props) {
  const history = useHistory()
  const element = document.createElement('div')
  const { children } = props

  useEffect(() => {
    modalRoot.appendChild(element)
    return () => {
      modalRoot.removeChild(element)
    }
  }, [])

  const handleClose = () => {
    history.goBack()
  }

  const onClose = (event) => {
    if (event.target.classList.contains('overlay')) {
      handleClose()
    }
  }

  const onCloseBtn = () => {
    handleClose()
  }

  const renderView = () => {
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal">
          {children}
          <CancelIcon fontSize='large' className='modal-close' onClick={onCloseBtn}/>
        </div>
      </div>
    )
  }

  return ReactDom.createPortal(
    renderView(),
    element
  )
}

Modal.propTypes = {
  children: PropTypes.object
}

export default Modal
