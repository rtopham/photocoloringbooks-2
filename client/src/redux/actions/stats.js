import api from '../../utils/api'
import { setAlert } from './alert'

import { STATS_LOADED } from './types'

//recordImageLoadStats

export const recordImageLoadStats = () => async (dispatch) => {
  const date = new Date()
  const dateString =
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '-' +
    date.getFullYear()
  try {
    await api.put('/stats', { type: 'images-loaded-all-time' })
    await api.put('/stats', { type: 'images-loaded' + dateString })

    //      dispatch({ type: SAVE_PAGE, payload: res.data })
    //      dispatch(setAlert('Page Saved to Gallery', 'success'))
    //      dispatch(loadGallery())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      console.log('error in try catch')
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
//recordLoginStats

export const recordLoginStats = () => async (dispatch) => {
  const date = new Date()
  const dateString =
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '-' +
    date.getFullYear()
  try {
    await api.put('/stats', {
      type: 'logins-all-time',
      description: 'Logins (All Time)'
    })
    await api.put('/stats', {
      type: 'logins' + dateString,
      description: 'Logins (By Day)'
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      console.log('error in try catch')
      errors.forEach((error) => console.log(error.msg))
    }
  }
}

// Load Stats
export const loadStats = () => async (dispatch) => {
  console.log('getting to load')
  try {
    const res = await api.get('/stats')

    const stats = res.data

    dispatch({
      type: STATS_LOADED,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
