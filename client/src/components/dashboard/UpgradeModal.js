import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  createStripeCustomer,
  createStripeSubscription
} from '../../redux/actions/stripe'
import PropTypes from 'prop-types'

const UpgradeModal = ({
  auth: { user },
  createStripeCustomer,
  createStripeSubscription,
  setMode
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [disableSubmit, setDisableSubmit] = useState(true)

  const clickCancel = () => {
    setMode('null')
  }

  const clickActivate = async (e) => {
    if (!stripe || !elements) {
      return
    }
    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log('[error]', error)
    } else {
      const newCustomer = await createStripeCustomer({
        name: user.name,
        email: user.email,
        payment_method: paymentMethod.id
      })

      await createStripeSubscription({
        name: user.name,
        email: user.email,
        customerId: newCustomer.id
      })
    }
    //closeUpgradeModal()
    setMode('null')
  }

  const validateForm = (ev) => {
    if (ev.error) setDisableSubmit(true)
    if (ev.error) console.log(ev.error)
    if (stripe && ev.complete === true) setDisableSubmit(false)
  }

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
          Upgrade Plan
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter a payment method to complete your upgrade for $5.95.</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#9e2146'
              }
            }
          }}
          onChange={validateForm}
        />
        <Button
          disabled={disableSubmit}
          onClick={clickActivate}
          className='mt-4'
        >
          Activate Upgrade
        </Button>{' '}
        <Button variant='secondary' onClick={clickCancel} className='mt-4'>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

UpgradeModal.propTypes = {
  stripe: PropTypes.object.isRequired,
  createStripeCustomer: PropTypes.func.isRequired,
  createStripeSubscription: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  mode: PropTypes.func.isRequired,
  createStripeCustomer: PropTypes.func.isRequired,
  createStripeSubscription: PropTypes.func.isRequired
})

export default connect(mapStateToProps, {
  createStripeCustomer,
  createStripeSubscription
})(UpgradeModal)
