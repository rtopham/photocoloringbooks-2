import api from '../../utils/api'
import {
  BOOKS_LOADED,
  BOOKS_ERROR,
  UPDATE_PAGE_LIST,
  UPDATE_COVER_PAGE,
  UPDATE_CURRENT_PAGE,
  SET_PAGE_INDEX,
  SET_CURRENT_BOOK,
  CLEAR_CURRENT_BOOK,
  OPEN_BOOK_EDIT_MODAL,
  CLOSE_BOOK_EDIT_MODAL,
  OPEN_BOOK_DELETE_MODAL,
  CLOSE_BOOK_DELETE_MODAL,
  DELETE_BOOK,
  CLEAR_BOOKS,
  DELETE_ALL_BOOKS
} from './types'

import { setAlert } from './alert'

//Clear Books
export const clearBooks = () => (dispatch) => {
  dispatch({ type: CLEAR_BOOKS })
}

// Load Coloring Books
export const loadBooks = () => async (dispatch) => {
  try {
    const res = await api.get('/books')

    dispatch({
      type: BOOKS_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BOOKS_ERROR
    })
  }
}

//Update PAGE LIST

export const updatePageList = (pageList) => async (dispatch) => {
  dispatch({ type: UPDATE_PAGE_LIST, payload: pageList })
}

//SET PAGE INDEX

export const setPageIndex = (pageIndex) => (dispatch) => {
  dispatch({ type: SET_PAGE_INDEX, payload: pageIndex })
}

//Update Cover Page

export const updateCoverPage = (coverPage) => async (dispatch) => {
  dispatch({ type: UPDATE_COVER_PAGE, payload: coverPage })
}

//Update Current Page

export const updateCurrentPage = (newValues) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_PAGE, payload: newValues })
}

//Save Book

export const saveBook = (book) => async (dispatch) => {
  try {
    await api.post('/books', book)
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
  dispatch(setAlert('Coloring Book Saved', 'success'))
  dispatch(loadBooks())
  dispatch({ type: CLEAR_CURRENT_BOOK })
}

// Set Current Book for Editing or Deleting

export const setCurrentBook = (book) => (dispatch) => {
  dispatch({ type: SET_CURRENT_BOOK, payload: book })
}

export const clearCurrentBook = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_BOOK })
}

//Open the Delete Modal

export const openDeleteModal = () => (dispatch) => {
  dispatch({ type: OPEN_BOOK_DELETE_MODAL })
}

//Close the Delete Modal

export const closeDeleteModal = () => (dispatch) => {
  dispatch({ type: CLOSE_BOOK_DELETE_MODAL })
}

//Open the Edit Modal

export const openEditModal = () => (dispatch) => {
  dispatch({ type: OPEN_BOOK_EDIT_MODAL })
}
//Close the Edit Modal

export const closeEditModal = () => (dispatch) => {
  dispatch({ type: CLOSE_BOOK_EDIT_MODAL })
}

//Delete Book
export const deleteBook = (id) => async (dispatch) => {
  try {
    await api.delete(`/books/${id}`)
    dispatch({ type: DELETE_BOOK, payload: id })
    dispatch(setAlert('Book Deleted', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

//Delete All Books of User
export const deleteBooks = () => async (dispatch) => {
  try {
    await api.delete(`/books/by-user`)
    dispatch({ type: DELETE_ALL_BOOKS })
    // dispatch(setAlert('Book Deleted', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
