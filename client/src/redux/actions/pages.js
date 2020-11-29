import api from '../../utils/api'
import {
  SET_SAVING,
  SET_PAGE_URL,
  SET_PAGE_BLOB,
  SAVE_PAGE,
  CLOSE_MODAL,
  GALLERY_LOADED,
  GALLERY_ERROR
} from './types'
import { setAlert } from './alert'

//Set Saving Boolean

export const setSaving = () => (dispatch) => {
  dispatch({
    type: SET_SAVING
  })
}

// Set Page URL
export const setPageUrl = (srcUrl) => (dispatch) => {
  dispatch({ type: SET_PAGE_URL, payload: srcUrl })
}

//Set Page Blob for saving file to file system.

export const setPageBlob = (srcBlob) => (dispatch) => {
  dispatch({ type: SET_PAGE_BLOB, payload: srcBlob })
}

//Save Page info in mongo

export const savePage = (formData) => async (dispatch) => {
  /*   const page = {
    caption: formData.caption,
    tags: formData.tags
  } */

  try {
    const res = await api.post('/pages', formData)
    dispatch({ type: SAVE_PAGE, payload: res.data })
    dispatch(setAlert('Page Saved to Gallery', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

//Close the Caption and Tags Modal

export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL })
}

// Load Gallery
export const loadGallery = () => async (dispatch) => {
  try {
    const res = await api.get('/pages')

    dispatch({
      type: GALLERY_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GALLERY_ERROR
    })
  }
}
