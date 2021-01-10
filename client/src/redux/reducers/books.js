import {
  BOOKS_LOADED,
  BOOKS_ERROR,
  UPDATE_PAGE_LIST,
  UPDATE_COVER_PAGE,
  SET_PAGE_INDEX,
  UPDATE_CURRENT_PAGE,
  SET_CURRENT_BOOK,
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  DELETE_BOOK
} from '../actions/types'

const initialState = {
  books: null,
  error: '',
  editModalShow: false,
  deleteModalShow: false,
  current: {
    pageList: [],
    pages: [],
    pageNumbers: false,
    pageIndex: 0,
    captions: false,
    changesMade: false,
    coverPage: {
      title: '',
      textLine1: '',
      textLine2: '',
      textLine3: '',
      coverPage: false,
      coverPageType: 'no-image',
      imageNumber: 1,
      footer: 'www.photocoloringbooks.com'
    },
    date: ''
  }
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case BOOKS_LOADED:
      return {
        ...state,
        books: payload
      }
    case BOOKS_ERROR:
      return {
        ...state,
        error: payload
      }

    case UPDATE_PAGE_LIST:
      return {
        ...state,
        current: { ...state.current, pageList: payload }
      }
    case SET_PAGE_INDEX:
      return {
        ...state,
        current: { ...state.current, pageIndex: payload }
      }
    case UPDATE_COVER_PAGE:
      return {
        ...state,
        current: {
          ...state.current,
          coverPage: { ...state.current.coverPage, ...payload }
        }
      }
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,

        current: {
          ...state.current,
          ...payload,
          coverPage: { ...state.current.coverPage, ...payload.coverPage }
        }
      }

    case SET_CURRENT_BOOK:
      return {
        ...state,
        current: {
          ...state.current,
          ...payload,
          coverPage: { ...state.current.coverPage, ...payload.coverPage }
        }
      }

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== payload),
        deleteModalShow: false
      }

    case CLOSE_EDIT_MODAL:
      return {
        ...state,
        saving: false,
        editModalShow: false
      }
    case OPEN_EDIT_MODAL:
      return {
        ...state,
        editModalShow: true
      }

    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: false
      }
    case OPEN_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: true
      }

    default:
      return state
  }
}
