import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import pages from './pages'
import books from './books'

export default combineReducers({
  alert,
  auth,
  pages,
  books
})
