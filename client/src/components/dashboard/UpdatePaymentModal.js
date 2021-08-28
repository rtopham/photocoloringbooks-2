import api from '../../utils/api'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { updateStripeCustomer } from '../../redux/actions/stripe'
import PropTypes from 'prop-types'

function UpdatePaymentModal({
  auth: { user },
  stripe: { card },
  setMode,
  updateStripeCustomer
}) {
  const createStripeSetupIntent = async () => {
    try {
      const res = await api.get(
        `/stripe/create-setup-intent/${user.stripeCustomerId}`
      )
      setClientSecret(res.data.CLIENT_SECRET)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    createStripeSetupIntent()
    //eslint-disable-next-line
  }, [])

  const [clientSecret, setClientSecret] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  const [disableSubmit, setDisableSubmit] = useState(true)

  const clickUpdatePaymentMethod = async (e) => {
    if (!stripe || !elements) {
      return
    }
    const cardElement = elements.getElement(CardElement)

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Photo Coloring Books' }
      }
    })

    if (result.error) {
      console.log('[error]', result.error)
    } else {
      await updateStripeCustomer({
        id: user.stripeCustomerId,
        payment_method: result.setupIntent.payment_method
      })

      setMode('renew')
    }
  }

  const validateForm = (ev) => {
    if (ev.error) setDisableSubmit(true)
    if (ev.error) console.log(ev.error)
    if (stripe && ev.complete === true) setDisableSubmit(false)
  }

  const clickCancelUpdate = () => {
    setMode('renew')
  }

  if (!card) return null

  return (
    <Modal
      show={true}
      onHide={clickCancelUpdate}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Update Payment Method
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter a new payment method.</p>
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
          onClick={clickUpdatePaymentMethod}
          className='mt-4'
        >
          Update Payment Method
        </Button>{' '}
        <Button
          variant='secondary'
          onClick={clickCancelUpdate}
          className='mt-4'
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

UpdatePaymentModal.propTypes = {
  stripe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateStripeCustomer: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  stripe: state.stripe
})

export default connect(mapStateToProps, {
  updateStripeCustomer
})(UpdatePaymentModal)
