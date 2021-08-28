import {
  SET_SAVING,
  SET_PAGE_URL,
  SET_PAGE_BLOB,
  SAVE_PAGE,
  CLOSE_PAGE_EDIT_MODAL,
  OPEN_PAGE_EDIT_MODAL,
  CLOSE_PAGE_DELETE_MODAL,
  OPEN_PAGE_DELETE_MODAL,
  GALLERY_LOADED,
  GALLERY_ERROR,
  SET_CURRENT_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
  FILTER_PAGES,
  CLEAR_FILTER,
  SET_TAG_LIST,
  CLEAR_PAGES,
  DELETE_ALL_PAGES
} from '../actions/types'

const initialState = {
  galleryLoading: true,
  saving: false,
  editModalShow: false,
  deleteModalShow: false,
  srcUrl: {},
  srcBlob: {},
  page: {
    filename: '',
    caption: '',
    tags: []
  },
  gallery: null,
  filtered: null,
  taglist: null,
  error: '',
  current: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_SAVING:
      return {
        ...state,
        saving: true,
        editModalShow: true
      }
    case SET_PAGE_URL:
      return {
        ...state,
        srcUrl: payload,
        saving: false
      }
    case SET_PAGE_BLOB:
      return {
        ...state,
        srcBlob: payload,
        saving: false
      }

    case SAVE_PAGE:
      return {
        ...state,
        saving: false,
        editModalShow: false
      }
    case UPDATE_PAGE:
      return {
        ...state,
        gallery: state.gallery.map((page) =>
          page._id === action.payload._id ? action.payload : page
        ),
        editModalShow: false
      }
    case DELETE_PAGE:
      return {
        ...state,
        gallery: state.gallery.filter((page) => page._id !== action.payload),
        deleteModalShow: false
      }

    case DELETE_ALL_PAGES:
      return {
        ...state,
        gallery: []
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        current: payload
      }
    case CLOSE_PAGE_EDIT_MODAL:
      return {
        ...state,
        saving: false,
        editModalShow: false
      }
    case OPEN_PAGE_EDIT_MODAL:
      return {
        ...state,
        editModalShow: true
      }
    case CLOSE_PAGE_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: false
      }
    case OPEN_PAGE_DELETE_MODAL:
      return {
        ...state,
        deleteModalShow: true
      }
    case GALLERY_LOADED:
      return {
        ...state,
        gallery: payload,
        galleryLoading: false
      }
    case GALLERY_ERROR:
      return {
        ...state,
        error: payload
      }
    case SET_TAG_LIST:
      return {
        ...state,
        taglist: payload
      }
    case FILTER_PAGES:
      return {
        ...state,
        filtered: state.gallery.filter((page) => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return page.caption.match(regex) || regex.test(page.tags)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case CLEAR_PAGES:
      return {
        ...initialState
      }
    default:
      return state
  }
}
