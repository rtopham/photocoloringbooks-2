import api from '../../utils/api'
import {
  SET_SAVING,
  SET_PAGE_URL,
  SET_PAGE_BLOB,
  SAVE_PAGE,
  UPDATE_PAGE,
  SET_CURRENT_PAGE,
  OPEN_PAGE_EDIT_MODAL,
  CLOSE_PAGE_EDIT_MODAL,
  OPEN_PAGE_DELETE_MODAL,
  CLOSE_PAGE_DELETE_MODAL,
  GALLERY_LOADED,
  GALLERY_ERROR,
  FILTER_PAGES,
  CLEAR_FILTER,
  DELETE_PAGE,
  SET_TAG_LIST,
  CLEAR_PAGES,
  DELETE_ALL_PAGES
} from './types'
import { setAlert } from './alert'
import { recordPageSaveStats } from './stats'

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
  try {
    const res = await api.post('/pages', formData)
    dispatch({ type: SAVE_PAGE, payload: res.data })
    dispatch(recordPageSaveStats())
    dispatch(setAlert('Page Saved to Gallery', 'success'))
    dispatch(loadGallery())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Set Current Page for Editing or Deleting

export const setCurrentPage = (page) => (dispatch) => {
  dispatch({ type: SET_CURRENT_PAGE, payload: page })
}

//Open the Caption and Tags Modal

export const openEditModal = () => (dispatch) => {
  dispatch({ type: OPEN_PAGE_EDIT_MODAL })
}
//Close the Caption and Tags Modal

export const closeEditModal = () => (dispatch) => {
  dispatch({ type: CLOSE_PAGE_EDIT_MODAL })
}

//Update Current Page in Database

export const updatePage = (page) => async (dispatch) => {
  try {
    const res = await api.put(`/pages/${page.id}`, page)
    dispatch({ type: UPDATE_PAGE, payload: res.data })
    dispatch(setAlert('Page Updated', 'success'))
    dispatch(loadGallery())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

//Open the Delete Modal

export const openDeleteModal = () => (dispatch) => {
  dispatch({ type: OPEN_PAGE_DELETE_MODAL })
}

//Close the Delete Modal

export const closeDeleteModal = () => (dispatch) => {
  dispatch({ type: CLOSE_PAGE_DELETE_MODAL })
}

//Delete Page
export const deletePage = (id) => async (dispatch) => {
  try {
    await api.delete(`/pages/${id}`)
    dispatch({ type: DELETE_PAGE, payload: id })
    dispatch(setAlert('Page Deleted', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

//Delete All of User's Pages

export const deletePages = () => async (dispatch) => {
  try {
    await api.delete('/pages/by-user')
    dispatch({ type: DELETE_ALL_PAGES })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Load Gallery
export const loadGallery = () => async (dispatch) => {
  try {
    const res = await api.get('/pages')

    const gallery = res.data
    let taglist = ['all']
    gallery.forEach((page) => {
      page.tags.forEach((tag) => {
        if (!taglist.includes(tag)) taglist.push(tag)
      })
    })

    dispatch({ type: SET_TAG_LIST, payload: taglist })

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

// Filter Pages

export const filterPages = (text) => (dispatch) => {
  dispatch({ type: FILTER_PAGES, payload: text })
}

//Clear Filter

export const clearFilter = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER })
}

//Clear Pages

export const clearPages = () => (dispatch) => {
  dispatch({ type: CLEAR_PAGES })
}
