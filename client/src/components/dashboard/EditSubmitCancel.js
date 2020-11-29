import React, { Fragment } from 'react'
import { Button, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const EditSubmitCancel = ({
  edit,
  showAlert,
  toggleEdit,
  alertText,
  validated
}) => {
  return (
    <Fragment>
      {!edit && !showAlert && (
        <Button variant='primary' onClick={toggleEdit}>
          Edit
        </Button>
      )}
      {edit && !showAlert && (
        <Fragment>
          <Button variant='primary' disabled={!validated} type='submit'>
            Submit
          </Button>{' '}
          <Button variant='secondary' onClick={toggleEdit}>
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

EditSubmitCancel.propTypes = {
  edit: PropTypes.bool.isRequired,
  showAlert: PropTypes.bool,
  toggleEdit: PropTypes.func.isRequired,
  alertText: PropTypes.string,
  validated: PropTypes.bool
}

export default EditSubmitCancel
