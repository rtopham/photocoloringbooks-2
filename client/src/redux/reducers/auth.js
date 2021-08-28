import {
  SET_LOADING,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  PASSWORD_RESET_TOKEN_INVALID,
  PASSWORD_RESET_TOKEN_VALID,
  RESET_USER_PASSWORD,
  UPDATE_USER_SUCCESS,
  OPEN_ACCOUNT_DELETE_MODAL,
  CLOSE_ACCOUNT_DELETE_MODAL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  userLoading: true,
  user: null,
  validResetToken: false,
  deleteAccountModalShow: false
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        userLoading: payload
      }
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        userLoading: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false
      }

    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }

    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }
    case PASSWORD_RESET_TOKEN_INVALID:
      return {
        ...state,
        validResetToken: false,
        loading: false
      }
    case PASSWORD_RESET_TOKEN_VALID:
      return {
        ...state,
        validResetToken: true,
        loading: false
      }
    case RESET_USER_PASSWORD:
      return {
        ...state,
        loading: false
      }

    case OPEN_ACCOUNT_DELETE_MODAL:
      return {
        ...state,
        deleteAccountModalShow: true
      }
    case CLOSE_ACCOUNT_DELETE_MODAL:
      return {
        ...state,
        deleteAccountModalShow: false
      }

    default:
      return state
  }
}
