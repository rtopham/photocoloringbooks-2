import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ErrorModal = ({
  title,
  errorText,
  buttonText,
  show,
  closeErrorModal
}) => {
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6>{errorText}</h6>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeErrorModal}>{buttonText || 'OK'}</Button>
      </Modal.Footer>
    </Modal>
  )
}

ErrorModal.propTypes = {
  title: PropTypes.string,
  errorText: PropTypes.string,
  buttonText: PropTypes.string,
  show: PropTypes.bool.isRequired,
  closeErrorModal: PropTypes.func.isRequired
}

export default ErrorModal
