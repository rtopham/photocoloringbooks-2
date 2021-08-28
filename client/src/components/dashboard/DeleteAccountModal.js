import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap'
import {
  deleteAccount,
  closeDeleteAccountModal
} from '../../redux/actions/auth'
import { validateConfirmationText } from '../../lib/form-validation'
import PropTypes from 'prop-types'

const DeleteAccountModal = ({
  auth: { deleteAccountModalShow },
  deleteAccount,
  closeDeleteAccountModal
}) => {
  const [formData, setFormData] = useState({ formText: '' })

  const { formText } = formData

  const confirmationText = 'permanently delete account'

  const clickDelete = () => {
    deleteAccount()
  }

  const clickCancel = () => {
    setFormData({ formText: '' })
    closeDeleteAccountModal()
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Modal centered show={deleteAccountModalShow}>
      <Modal.Header>
        <Modal.Title>Permanently Delete Account?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {' '}
        <i className='fa fa-exclamation-triangle'></i> This action cannot be
        undone. All of your stored coloring books and pages will be deleted
        permanently and you will no longer be able to access your account. If
        you have an active subscription to the premium plan, your subscription
        will be terminated, and you will not recieve a refund for any portion of
        the unused subscription period.{' '}
        <Form className='mt-3'>
          <FormGroup controlId='formText'>
            <FormLabel>
              To confirm deletion, type <i>{confirmationText}</i> below.
            </FormLabel>
            <FormControl
              autoFocus
              isValid={
                validateConfirmationText(formText, confirmationText) ===
                'success'
              }
              name='formText'
              value={formText}
              placeholder={confirmationText}
              onChange={onChange}
            />
          </FormGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={
            validateConfirmationText(formText, confirmationText) !== 'success'
          }
          onClick={clickDelete}
        >
          Delete Account
        </Button>{' '}
        <Button variant='secondary' onClick={clickCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteAccountModal.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  closeDeleteAccountModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  deleteAccount,
  closeDeleteAccountModal
})(DeleteAccountModal)
