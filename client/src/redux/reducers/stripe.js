import {
  CREATE_STRIPE_CUSTOMER,
  CREATE_STRIPE_SUBSCRIPTION,
  STRIPE_CUSTOMER_LOADED,
  STRIPE_SUBSCRIPTION_LOADED,
  STRIPE_CARD_LOADED,
  CLEAR_STRIPE_DATA,
  UPDATE_STRIPE_CUSTOMER
} from '../actions/types'

const initialState = { customer: null, subscription: null, card: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_STRIPE_CUSTOMER:
    case STRIPE_CUSTOMER_LOADED:
    case UPDATE_STRIPE_CUSTOMER:
      return {
        ...state,
        customer: payload
      }

    case CREATE_STRIPE_SUBSCRIPTION:
    case STRIPE_SUBSCRIPTION_LOADED:
      return {
        ...state,
        subscription: payload
      }
    case STRIPE_CARD_LOADED:
      return {
        ...state,
        card: payload
      }
    case CLEAR_STRIPE_DATA:
      return {
        ...state,
        customer: null,
        subscription: null
      }

    default:
      return state
  }
}
