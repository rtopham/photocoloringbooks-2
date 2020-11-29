import {
  SET_SAVING,
  SET_PAGE_URL,
  SET_PAGE_BLOB,
  SAVE_PAGE,
  CLOSE_MODAL,
  GALLERY_LOADED,
  GALLERY_ERROR
} from '../actions/types'

const initialState = {
  saving: false,
  modalShow: false,
  srcUrl: {},
  srcBlob: {},
  page: {
    filename: '',
    caption: '',
    tags: []
  },
  gallery: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_SAVING:
      return {
        ...state,
        saving: true,
        modalShow: true
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
        modalShow: false
      }
    case CLOSE_MODAL:
      return {
        ...state,
        saving: false,
        modalShow: false
      }
    case GALLERY_LOADED:
      return {
        ...state,
        gallery: payload
      }
    default:
      return state
  }
}
