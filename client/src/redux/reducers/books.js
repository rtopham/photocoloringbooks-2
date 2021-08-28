import {
  BOOKS_LOADED,
  BOOKS_ERROR,
  UPDATE_PAGE_LIST,
  UPDATE_COVER_PAGE,
  SET_PAGE_INDEX,
  UPDATE_CURRENT_PAGE,
  SET_CURRENT_BOOK,
  CLEAR_CURRENT_BOOK,
  OPEN_BOOK_EDIT_MODAL,
  CLOSE_BOOK_EDIT_MODAL,
  OPEN_BOOK_DELETE_MODAL,
  CLOSE_BOOK_DELETE_MODAL,
  DELETE_BOOK,
  CLEAR_BOOKS,
  DELETE_ALL_BOOKS
} from '../actions/types'

const initialState = {
  booksLoading: true,
  books: null,
  error: '',
  editMode: false,
  editModalShow: false,
  deleteModalShow: false,
  current: {
    pageList: [],
    pages: [],
    pageNumbers: false,
    pageIndex: -1,
    captions: false,
    changesMade: false,
    coverPage: {
      title: '',
      textLine1: '',
      textLine2: '',
      textLine3: '',
      coverPage: true,
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
        books: payload,
        current: {
          ...initialState.current,
          pageList: [],
          coverPage: { ...initialState.current.coverPage }
        },
        booksLoading: false
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
          coverPage: { ...state.current.coverPage, ...payload.coverPage },
          changesMade: true
        },
        editMode: true
      }

    case CLEAR_CURRENT_BOOK:
      return {
        ...state,
        current: {
          ...initialState.current,
          pageList: [],
          coverPage: { ...initialState.current.coverPage }
        },
        editMode: false
      }

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== payload),
        current: {
          ...initialState.current,
          pageList: [],
          coverPage: { ...initialState.current.coverPage }
        },
        deleteModalShow: false
      }

    case DELETE_ALL_BOOKS:
      return {
        ...state,
        books: [],
        current: {
          ...initialState.current,
          pageList: [],
          coverPage: { ...initialState.current.coverPage }
        }
      }

    case CLOSE_BOOK_EDIT_MODAL:
      return {
        ...state,
        saving: false,
        editModalShow: false
      }
    case OPEN_BOOK_EDIT_MODAL:
      return {
        ...state,
        editModalShow: true
      }

    case CLOSE_BOOK_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: false
      }
    case OPEN_BOOK_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: true
      }

    case CLEAR_BOOKS:
      return {
        ...initialState
      }

    default:
      return state
  }
}
