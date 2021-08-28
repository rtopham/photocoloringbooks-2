import api from '../../utils/api'
import {
  CREATE_STRIPE_CUSTOMER,
  CREATE_STRIPE_SUBSCRIPTION,
  STRIPE_CUSTOMER_LOADED,
  STRIPE_SUBSCRIPTION_LOADED,
  STRIPE_CARD_LOADED,
  CLEAR_STRIPE_DATA,
  UPDATE_STRIPE_CUSTOMER
} from './types'
import { setAlert } from './alert'
import { loadUser } from './auth'

export const clearStripeData = () => (dispatch) => {
  try {
    dispatch({ type: CLEAR_STRIPE_DATA })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const createStripeCustomer = (customer) => async (dispatch) => {
  try {
    const res = await api.post('/stripe', customer)
    await api.put('/users', {
      name: customer.name,
      email: customer.email,
      stripeCustomerId: res.data.id
    })
    dispatch({
      type: CREATE_STRIPE_CUSTOMER,
      payload: res.data
    })
    return res.data
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const updateStripeCustomer = (customer) => async (dispatch) => {
  try {
    const res = await api.put('/stripe', customer)

    dispatch({
      type: UPDATE_STRIPE_CUSTOMER,
      payload: res.data
    })
    dispatch(loadUser())
    dispatch(setAlert('Payment Method Updated', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const createStripeSubscription = (customer) => async (dispatch) => {
  try {
    const res = await api.post('/stripe/create-new-subscription', customer)
    await api.put('/users', {
      name: customer.name,
      email: customer.email,
      stripeSubscriptionId: res.data.id,
      galleryLimit: 50,
      bookLimit: 6
    })
    dispatch({
      type: CREATE_STRIPE_SUBSCRIPTION,
      payload: res.data
    })
    dispatch(setAlert('Plan Activated', 'success'))
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const createStripePaymentIntent = (amount) => async (dispatch) => {
  try {
    const res = await api.post('/stripe/create-payment-intent', amount)
    console.log(res.data)
  } catch (err) {}
}

export const loadStripeCustomerData = (customerId) => async (dispatch) => {
  try {
    const res = await api.get(`/stripe/customer/${customerId}`)
    dispatch({ type: STRIPE_CUSTOMER_LOADED, payload: res.data })
    dispatch(
      loadStripeCardData(res.data.invoice_settings.default_payment_method)
    )
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const loadStripeCardData = (paymentMethodId) => async (dispatch) => {
  try {
    const res = await api.get(`/stripe/card/${paymentMethodId}`)
    dispatch({ type: STRIPE_CARD_LOADED, payload: res.data })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const loadStripeSubscriptionData =
  (subscriptionId) => async (dispatch) => {
    try {
      const res = await api.get(`/stripe/subscription/${subscriptionId}`)
      dispatch({ type: STRIPE_SUBSCRIPTION_LOADED, payload: res.data })
    } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
    }
  }
