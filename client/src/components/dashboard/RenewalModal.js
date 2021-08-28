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
import { validateConfirmationText } from '../../lib/form-validation'
import { useStripe } from '@stripe/react-stripe-js'
import { createStripeSubscription } from '../../redux/actions/stripe'
import PropTypes from 'prop-types'

function RenewalModal({
  auth: { user },
  stripe: { card },
  createStripeSubscription,
  setMode
}) {
  const stripe = useStripe()

  const [formData, setFormData] = useState({ formText: '' })

  const { formText } = formData

  const confirmationText = 'renew'

  const clickActivate = async (e) => {
    if (!stripe) {
      return
    }

    await createStripeSubscription({
      name: user.name,
      email: user.email,
      customerId: user.stripeCustomerId
    })

    setMode('null')
  }

  const clickUpdate = () => {
    setMode('update')
  }

  const clickCancel = () => {
    setMode('null')
    setFormData({ formText: '' })
    //    closeRenewalModal()
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  if (!card) return null

  return (
    <Modal
      show={true}
      onHide={clickCancel}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Renew Subscription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Click the button below to renew your subscription for one year using
          your current billing information. Your card will be charged $
          {process.env.REACT_APP_SUBSCRIPTION_PRICE}.
        </p>
        <p>
          Billing Info: Credit card ending in:{' '}
          <strong>{card.card.last4}</strong>{' '}
          <Button variant='link' onClick={clickUpdate}>
            Update
          </Button>
        </p>
        <Form className='mt-3'>
          <FormGroup controlId='formText'>
            <FormLabel>
              To confirm renewal, type <i>{confirmationText}</i> below.
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
        <Button
          disabled={
            validateConfirmationText(formText, confirmationText) !== 'success'
          }
          onClick={clickActivate}
          className='mt-4'
        >
          Renew Subscription
        </Button>{' '}
        <Button variant='secondary' onClick={clickCancel} className='mt-4'>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

RenewalModal.propTypes = {
  stripe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createStripeSubscription: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  stripe: state.stripe
})

export default connect(mapStateToProps, {
  createStripeSubscription
})(RenewalModal)
