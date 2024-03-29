import api from '../../utils/api'
import { setAlert } from './alert'

import { STATS_LOADED, CLEAR_STATS } from './types'

const getDateString = () => {
  const date = new Date()
  const dateString =
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '-' +
    date.getFullYear()
  return dateString
}

//recordImageLoadStats

export const recordImageLoadStats = () => async (dispatch) => {
  const dateString = getDateString()
  try {
    await api.put('/all-time-stats', {
      type: 'images-loaded-all-time',
      description: 'Images Loaded'
    })
    await api.put('/stats', {
      type: 'images-loaded' + dateString,
      description: 'Images Loaded'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordLoginStats

export const recordLoginStats = () => async (dispatch) => {
  const dateString = getDateString()
  try {
    await api.put('/all-time-stats', {
      type: 'logins-all-time',
      description: 'Logins'
    })
    await api.put('/stats', {
      type: 'logins' + dateString,
      description: 'Logins'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordSignUpStats

export const recordSignUpStats = () => async (dispatch) => {
  const dateString = getDateString()
  try {
    await api.put('/all-time-stats', {
      type: 'signups-all-time',
      description: 'Sign Ups'
    })
    await api.put('/stats', {
      type: 'signups' + dateString,
      description: 'Sign Ups'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordPageSaveStats

export const recordPageSaveStats = () => async (dispatch) => {
  const dateString = getDateString()
  try {
    await api.put('/all-time-stats', {
      type: 'pages-saved-all-time',
      description: 'Pages Saved'
    })
    await api.put('/stats', {
      type: 'pages-saved' + dateString,
      description: 'Pages Saved'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordBooksSaveStats

export const recordBookSaveStats = () => async (dispatch) => {
  const dateString = getDateString()
  try {
    await api.put('/all-time-stats', {
      type: 'books-saved-all-time',
      description: 'Books Saved'
    })
    await api.put('/stats', {
      type: 'books-saved' + dateString,
      description: 'Books Saved'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordPDFStats

export const recordPDFStats = () => async (dispatch) => {
  const dateString = getDateString()

  try {
    await api.put('/all-time-stats', {
      type: 'pdfs-created-all-time',
      description: 'PDFs Created'
    })
    await api.put('/stats', {
      type: 'pdfs-created' + dateString,
      description: 'PDFs Created'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
  }
}

// Load Stats
export const loadStats = () => async (dispatch) => {
  try {
    const res = await api.get('/stats')
    const res2 = await api.get('/all-time-stats')
    const res3 = await api.get('/other-stats')
    const res4 = await api.get('/stripe/active-subscriptions')

    dispatch({
      type: STATS_LOADED,
      payload: res.data,
      payload2: res2.data,
      payload3: res3.data,
      payload4: res4.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

//Clear Stats

export const clearStats = () => (dispatch) => {
  dispatch({ type: CLEAR_STATS })
}
