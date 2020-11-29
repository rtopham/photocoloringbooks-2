import api from '../../utils/api'
import { setAlert } from './alert'
import {
  SET_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  PASSWORD_RESET_TOKEN_INVALID,
  PASSWORD_RESET_TOKEN_VALID,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_FAIL,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAIL
} from './types'

// Set Loading

export const setLoading = (loading) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: loading })
}

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password }

  try {
    const res = await api.post('/auth', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout
export const logout = () => ({ type: LOGOUT })

// Update User

export const updateUser = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/users', formData)

    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
    formData.password
      ? dispatch(setAlert('Password Updated', 'success'))
      : dispatch(setAlert('Profile Updated', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: UPDATE_USER_FAIL })
  }
}

//Request Password Reset Email

export const requestPasswordReset = (email) => async (dispatch) => {
  const body = { email }

  try {
    const res = await api.put('/users/password-reset-request', body)

    dispatch(setAlert(res.data, 'success'))

    dispatch({ type: REQUEST_PASSWORD_RESET_SUCCESS })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: REQUEST_PASSWORD_RESET_FAIL })
  }
}

// Check Reset Token

export const checkResetToken = (token) => async (dispatch) => {
  try {
    const body = { token }

    const res = await api.post('users/validate-reset-token', body)

    dispatch({
      type: PASSWORD_RESET_TOKEN_VALID,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PASSWORD_RESET_TOKEN_INVALID
    })
  }
}

// Reset User Password

export const resetUserPassword = (token, password) => async (dispatch) => {
  try {
    const body = { token, password }

    const res = await api.put('/users/reset-password', body)

    dispatch(setAlert(res.data, 'success'))

    dispatch({
      type: RESET_USER_PASSWORD
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: RESET_USER_PASSWORD_FAIL
    })
  }
}
