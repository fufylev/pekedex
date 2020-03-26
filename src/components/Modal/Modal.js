import './Modal.scss'

import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone'
const modalRoot = document.getElementById('modal')

function Modal (props) {
  const history = useHistory()
  const element = document.createElement('div')

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
    // eslint-disable-next-line react/prop-types
    const { children } = props
    return (
      <>
        <div className="overlay" onClick={onClose}>
          <div className="modal">
            {children}
            <CancelTwoToneIcon fontSize='large' className='modal-close' onClick={onCloseBtn}/>
          </div>
        </div>
      </>

    )
  }

  return ReactDom.createPortal(
    renderView(),
    element
  )
}

Modal.propTypes = {
  children: PropTypes.string
}

export default Modal

// export class Modal extends Component {
//     constructor(props) {
//         super(props);
//
//         this.element = document.createElement('div');
//     }
//
//     componentDidMount() {
//         modalRoot.appendChild(this.element);
//     }
//
//     componentWillUnmount() {
//         modalRoot.removeChild(this.element);
//     }
//
//     onClose = (event) => {
//         const { onClose } = this.props;
//
//         if (event.target.classList.contains('overlay')) {
//             onClose();
//         }
//     };
//
//     onCloseBtn = () => {
//         const { onClose } = this.props;
//         onClose();
//     };
//
//     renderView = () => {
//         const { children } = this.props;
//         return (
//           <>
//               <div className="overlay" onClick={this.onClose}>
//                   <div className="modal">
//                       {children}
//                   </div>
//                   <div className='modal-close' onClick={this.onCloseBtn}>X</div>
//               </div>
//           </>
//
//         );
//     };
//
//     render() {
//         return ReactDom.createPortal(
//           this.renderView(),
//           this.element,
//         );
//     }
// }
