import { STATS_LOADED, CLEAR_STATS } from '../actions/types'

const initialState = { stats: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case STATS_LOADED:
      return {
        ...state,
        stats: payload
      }
    case CLEAR_STATS:
      return {
        ...state,
        stats: null
      }

    default:
      return state
  }
}
