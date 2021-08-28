import React, { Fragment } from 'react'
import { Button, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const DeleteConfirmCancel = ({
  deleteClicked,
  showAlert,
  toggleDelete,
  alertText
}) => {
  return (
    <Fragment>
      {!deleteClicked && !showAlert && (
        <Button variant='primary' onClick={toggleDelete}>
          Delete Account
        </Button>
      )}
      {deleteClicked && !showAlert && (
        <Fragment>
          <Button variant='primary' type='submit'>
            Submit
          </Button>{' '}
          <Button variant='secondary' onClick={toggleDelete}>
            Cancel
          </Button>
        </Fragment>
      )}

      {showAlert && (
        <Alert show={showAlert} variant='success'>
          {alertText}
        </Alert>
      )}
    </Fragment>
  )
}

DeleteConfirmCancel.propTypes = {
  delete: PropTypes.bool.isRequired,
  showAlert: PropTypes.bool,
  toggleDelete: PropTypes.func.isRequired,
  alertText: PropTypes.string
}

export default DeleteConfirmCancel
